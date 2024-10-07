const express = require("express");
const {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById
} = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.put("/update/:userId", authenticate, updateUser);
userRoute.delete("/delete/:userId", authenticate, deleteUser);
userRoute.get("/getAllUsers",authenticate, getAllUsers);
userRoute.get("/getUserById/:userId", authenticate, getUserById);
module.exports = userRoute;
