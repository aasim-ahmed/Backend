import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/createUser", userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.get("/getAllUsers", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;