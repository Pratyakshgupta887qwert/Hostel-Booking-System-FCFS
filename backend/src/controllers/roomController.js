import hostelSequelize from "../config/hostelDatabase.js";
import { processPreview } from "../services/roomUploadService.js";
import Room from "../models/roomModel.js";

export const previewRooms = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File required" });
    }

    const result = await processPreview(file.buffer, req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const confirmRooms = async (req, res) => {
  const t = await hostelSequelize.transaction();

  try {
    const file = req.file;
    const hostel_id = req.params.id;

    if (!file) {
      return res.status(400).json({ message: "File required" });
    }

    // 🔁 Re-run preview logic
    const preview = await processPreview(file.buffer, hostel_id);

    // If preview returned error (duplicate etc)
    if (preview.status === "error") {
      return res.status(400).json(preview);
    }

    const { new_rooms, updated_rooms } = preview;

    // ---------------- INSERT NEW ROOMS ----------------
    for (const room of new_rooms) {
      await Room.create(
        {
          hostel_id,
          room_number: room.room_number,
          total_beds: room.total_beds,
          available_beds: room.total_beds, // full available
          is_ac: room.is_ac,
        },
        { transaction: t },
      );
    }

    // ---------------- UPDATE EXISTING ROOMS ----------------
    for (const room of updated_rooms) {
      const dbRoom = await Room.findOne({
        where: {
          hostel_id,
          room_number: room.room_number,
        },
        transaction: t,
      });

      const allocated = dbRoom.total_beds - dbRoom.available_beds;

      await dbRoom.update(
        {
          total_beds: room.new_total_beds,
          available_beds: room.new_total_beds - allocated,
          is_ac: room.new_is_ac,
        },
        { transaction: t },
      );
    }

    // ✅ COMMIT
    await t.commit();

    return res.status(200).json({
      message: "Room mapping successful",
      inserted: new_rooms.length,
      updated: updated_rooms.length,
      skipped: preview.unchanged_rooms.length,
    });
  } catch (error) {
    // ❌ ROLLBACK
    await t.rollback();

    console.error(error);

    return res.status(500).json({
      message: "Room mapping failed. No changes applied.",
      error: error.message,
    });
  }
};
