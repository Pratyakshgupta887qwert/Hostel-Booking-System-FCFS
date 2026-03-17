import { parseExcel } from "../utils/excelParser.js";
import { normalizeRoomNumber, normalizeBoolean } from "../utils/normalizers.js";
import Room from "../models/roomModel.js";

export const processPreview = async (fileBuffer, hostel_id) => {
  const rows = parseExcel(fileBuffer);

  // Limit rows
  if (rows.length > 500) {
    throw new Error("Maximum 500 rooms allowed");
  }

  const processed = [];
  const warnings = [];

  // ---------------- PROCESS EXCEL ----------------
  rows.forEach((row, index) => {
    const normalizedRow = {};

    Object.keys(row).forEach((key) => {
      normalizedRow[key.trim().toLowerCase()] = row[key];
    });

    const room_number =
      normalizedRow["room_number"] ||
      normalizedRow["room no"] ||
      normalizedRow["roomnumber"] ||
      normalizedRow["room"];

    const total_beds =
      normalizedRow["total_beds"] ??
      normalizedRow["beds"] ??
      normalizedRow["bed_count"];

    const is_ac =
      normalizedRow["is_ac"] || normalizedRow["ac"] || normalizedRow["ac_room"];

    // Skip empty rows
    if (!room_number && !total_beds && !is_ac) return;

    const normalizedRoom = normalizeRoomNumber(room_number);
    const beds = Number(total_beds);
    const ac = normalizeBoolean(is_ac);

    // Validation
    if (!normalizedRoom || !beds || ac === null) {
      warnings.push({
        row: index + 2,
        message: "Invalid data. Row skipped.",
      });
      return;
    }

    if (beds < 1 || beds > 3) {
      warnings.push({
        row: index + 2,
        message: "Beds must be between 1 and 3",
      });
      return;
    }

    processed.push({
      room_number: normalizedRoom,
      total_beds: beds,
      is_ac: ac,
    });
  });

  // ---------------- DUPLICATE CHECK ----------------
  const roomMap = new Map();
  const duplicateRooms = [];

  processed.forEach((room) => {
    if (roomMap.has(room.room_number)) {
      duplicateRooms.push({ room_number: room.room_number });
    } else {
      roomMap.set(room.room_number, true);
    }
  });

  if (duplicateRooms.length > 0) {
    return {
      status: "error",
      message: "Duplicate room numbers found in uploaded file",
      duplicates: duplicateRooms,
    };
  }

  // ---------------- FETCH DB ROOMS ----------------
  const existingRooms = await Room.findAll({
    where: { hostel_id },
  });

  const dbRoomMap = new Map();

  existingRooms.forEach((room) => {
    dbRoomMap.set(room.room_number, room);
  });

  // ---------------- COMPARISON ----------------
  const new_rooms = [];
  const updated_rooms = [];
  const unchanged_rooms = [];

  processed.forEach((room) => {
    const dbRoom = dbRoomMap.get(room.room_number);

    // NEW ROOM
    if (!dbRoom) {
      new_rooms.push(room);
      return;
    }

    // CHECK CHANGES
    const isChanged =
      dbRoom.total_beds !== room.total_beds || dbRoom.is_ac !== room.is_ac;

    if (isChanged) {
      // 🔥 SAFETY RULE
      const allocated = dbRoom.total_beds - dbRoom.available_beds;

      if (room.total_beds < allocated) {
        throw new Error(
          `Cannot reduce beds for room ${room.room_number}. Already ${allocated} students allocated.`,
        );
      }

      updated_rooms.push({
        room_number: room.room_number,
        old_total_beds: dbRoom.total_beds,
        new_total_beds: room.total_beds,
        old_is_ac: dbRoom.is_ac,
        new_is_ac: room.is_ac,
      });
    } else {
      unchanged_rooms.push(room.room_number);
    }
  });

  // ---------------- SUMMARY ----------------
  const summary = {
    new_rooms: new_rooms.length,
    updated_rooms: updated_rooms.length,
    unchanged_rooms: unchanged_rooms.length,
    skipped_rows: warnings.length,
  };

  // ---------------- FINAL RESPONSE ----------------
  return {
    summary,
    new_rooms,
    updated_rooms,
    unchanged_rooms,
    warnings,
  };
};
