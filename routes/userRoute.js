import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

// Public routes
userRoutes.post("/createUser", userController.createUser);
userRoutes.post("/login", userController.loginUser);

// Protected routes - require authentication
userRoutes.get("/getAllUsers", auth, userController.getAllUsers);
userRoutes.get("/:id", auth, userController.getUserById);
userRoutes.put("/:id", auth, userController.updateUser);
userRoutes.delete("/:id", auth, userController.deleteUser);

export default userRoutes;