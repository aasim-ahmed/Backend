import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

const auth = async (req, res, next) => {
  try {
  // Check for the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }
  
  const token = authHeader.split(' ')[1];
  
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // Find user and attach to request
  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
  return res.status(401).json({ message: 'Unauthorized: User not found' });
  }
  
  req.user = user; // Attach user to request
  next();
  } catch (error) {
  console.error('Auth error:', error.message);
  return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
  };
  export default auth;