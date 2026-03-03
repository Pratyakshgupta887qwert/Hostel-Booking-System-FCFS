import { Hostel, HostelAllowedYear } from "../models/index.js";

export const createHostel = async (req, res) => {
  try {
    const { hostel_name, gender } = req.body;

    // Basic validation
    if (!hostel_name || !gender) {
      return res.status(400).json({
        message: "hostel_name and gender are required",
      });
    }

    if (!["male", "female"].includes(gender)) {
      return res.status(400).json({
        message: "Gender must be 'male' or 'female'",
      });
    }

    const existing = await Hostel.findOne({
      where: { hostel_name },
    });

    if (existing) {
      return res.status(409).json({
        message: "Hostel with this name already exists",
      });
    }

    const hostel = await Hostel.create({
      hostel_name,
      gender,
    });

    return res.status(201).json({
      message: "Hostel created successfully",
      hostel,
    });
  } catch (error) {
    console.error("Create hostel error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const addAllowedYears = async (req, res) => {
  try {
    const { id } = req.params;
    const { years } = req.body;

    // Validate hostel exists
    const hostel = await Hostel.findByPk(id);
    if (!hostel) {
      return res.status(404).json({
        message: "Hostel not found",
      });
    }

    // Validate years
    if (!Array.isArray(years) || years.length === 0) {
      return res.status(400).json({
        message: "Years must be a non-empty array",
      });
    }

    const validYears = [1, 2, 3, 4];

    for (const year of years) {
      if (!validYears.includes(year)) {
        return res.status(400).json({
          message: "Year must be between 1 and 4",
        });
      }
    }

    // Prepare entries
    const entries = years.map((year) => ({
      hostel_id: id,
      year,
    }));

    await HostelAllowedYear.bulkCreate(entries, {
      ignoreDuplicates: true,
    });

    return res.status(201).json({
      message: "Allowed years added successfully",
    });
  } catch (error) {
    console.error("Add allowed years error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.findAll({
      include: [
        {
          model: HostelAllowedYear,
          attributes: ["year"],
        },
      ],
      order: [["hostel_id", "ASC"]],
    });

    const formatted = hostels.map((hostel) => ({
      hostel_id: hostel.hostel_id,
      hostel_name: hostel.hostel_name,
      gender: hostel.gender,
      is_active: hostel.is_active,
      allowed_years: hostel.HostelAllowedYears.map((entry) => entry.year),
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("Admin hostel fetch error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
