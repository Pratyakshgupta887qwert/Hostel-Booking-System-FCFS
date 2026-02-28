import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find student
    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return res.status(401).json({ message: "Invalid ID/Password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid ID/Password" });
    }

    // Check hosteller
    if (!student.hosteller) {
      return res.status(403).json({ message: "Not a hosteller" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        roll_number: student.roll_number,
        year: student.year,
        gender: student.gender,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return res.status(200).json({
      token,
      roll_number: student.roll_number,
      year: student.year,
      gender: student.gender,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
};
