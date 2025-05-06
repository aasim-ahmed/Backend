import express from "express";
import userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/createUser", userController.createUser);
userRoutes.get("/getAllUsers", userController.getAllUsers);
userRoutes.get("/:id", userController.getUser);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;