const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const validator = require("validator");

// Register User
const register = async (req, res) => {
  try {
    let { username, email, password, phonenumber } = req.body;
    username = validator.escape(username.trim());
    if (!validator.isEmail(email)) {
      return res.status(403).json({ message: "Invalid email" });
    }
    if (!validator.isLength(password, { min: 8 })) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phonenumber,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.message === "Validation error") {
      res
        .status(400)
        .json({ error: "User already registered with this email address" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found with this email" });

    const isCorrecctPassword = await bcrypt.compare(password, user.password);
    if (!isCorrecctPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_TOKEN, {
      expiresIn: "3h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, phonenumber } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (phonenumber) updateData.phonenumber = phonenumber;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const result = await User.update(updateData, { where: { userId: userId } });
    if (result[0] === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }
    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.destroy({ where: { userId: userId } });
    if (result === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserById = async (req, res) => {
  try {
    console.log("getUserById");
    const userId = req.params.userId;
    const result = await User.findByPk(userId);
    if (!result) {
      return res.status(500).json({ message: "User not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
