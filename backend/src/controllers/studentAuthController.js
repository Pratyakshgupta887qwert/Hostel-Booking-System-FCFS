import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/authStudentModel.js";
import { ensureHostelStudentExists } from "../services/hostelStudentService.js";

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return res.status(401).json({ message: "Invalid ID/Password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid ID/Password" });
    }

    if (!student.hosteller) {
      return res.status(403).json({ message: "Not a hosteller" });
    }

    await ensureHostelStudentExists(student);

    const token = jwt.sign(
      {
        type: "student",
        roll_number: student.roll_number,
        name: student.name,
        year: student.year,
        gender: student.gender,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return res.status(200).json({
      token,
      roll_number: student.roll_number,
      name: student.name,
      year: student.year,
      gender: student.gender,
    });
  } catch (error) {
    console.error("Student login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getStudentProfile = (req, res) => {
  res.status(200).json({
    message: "Student profile accessed successfully",
    user: req.user,
  });
};
