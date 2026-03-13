import { Hostel, HostelAllowedYear } from "../models/index.js";

export const getEligibleHostels = async (req, res) => {
  try {
    const { year, gender } = req.user;

    const hostels = await Hostel.findAll({
      where: {
        gender,
        is_active: true,
      },
      include: [
        {
          model: HostelAllowedYear,
          where: { year },
          attributes: [],
        },
      ],
      distinct: true,
    });

    const formatted = hostels.map((hostel) => ({
      hostel_id: hostel.hostel_id,
      hostel_name: hostel.hostel_name,
      gender: hostel.gender,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("Student hostel fetch error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
