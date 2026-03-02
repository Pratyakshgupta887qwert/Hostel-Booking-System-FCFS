import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Invalid ID/Password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid ID/Password" });
    }

    const token = jwt.sign(
      {
        type: "admin",
        employee_id: admin.employee_id,
        name: admin.name,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return res.status(200).json({
      token,
      employee_id: admin.employee_id,
      name: admin.name,
      role: admin.role,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAdminProfile = (req, res) => {
  res.status(200).json({
    message: "Admin profile accessed successfully",
    user: req.user,
  });
};
