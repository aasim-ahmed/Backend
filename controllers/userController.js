import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
    createUser: async (req, res) => {
        try {
            const { email, number, firstName, lastName, organization, role } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            
            const user = new User({ email, number, firstName, lastName, organization, role });
            await user.save();
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}