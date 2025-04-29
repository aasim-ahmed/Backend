import express from "express";
import Question from "../models/Question.js";
import QuestionType from "../models/QuestionType.js";

const questionController = {
    createQuestion: async (req, res) => {
        try {
            // Create a new question with validated request body
            const question = await Question.create(req.body);
            
            // Populate references for better response
            await question.populate([
                { path: 'type', select: 'name description' },
                { path: 'category', select: 'name' }
            ]);
            
            res.status(201).json({
                success: true,
                data: question
            });
        } catch (error) {
            // Handle validation errors separately
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map(val => val.message);
                return res.status(400).json({
                    success: false,
                    message: messages.join(', ')
                });
            }
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },

    getAllQuestions: async (req, res) => {
        try {
            // Support for pagination and filtering
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            
            // Build query based on filters
            let query = {};
            
            if (req.query.type) {
                query.type = req.query.type;
            }
            
            if (req.query.difficulty) {
                query.difficulty = req.query.difficulty;
            }

            if (req.query.category) {
                query.category = req.query.category;
            }
            
            // Support searching by question text
            if (req.query.search) {
                query.question_text = { $regex: req.query.search, $options: 'i' };
            }
            
            // Execute query with pagination and populate references
            const questions = await Question.find(query)
                .populate('type', 'name description')
                .populate('category', 'name')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
                
            // Get total count for pagination
            const total = await Question.countDocuments(query);
            
            res.status(200).json({
                success: true,
                count: questions.length,
                total,
                pagination: {
                    page,
                    pages: Math.ceil(total / limit)
                },
                data: questions
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },

    getQuestion: async (req, res) => {
        try {
            const question = await Question.findById(req.params.id)
                .populate('type', 'name description')
                .populate('category', 'name');
            
            // Check if question exists
            if (!question) {
                return res.status(404).json({
                    success: false,
                    message: "Question not found"
                });
            }
            
            res.status(200).json({
                success: true,
                data: question
            });
        } catch (error) {
            // Handle invalid ID format
            if (error.kind === 'ObjectId') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid question ID format"
                });
            }
            
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },

    updateQuestion: async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);
            
            // Check if question exists
            if (!question) {
                return res.status(404).json({
                    success: false,
                    message: "Question not found"
                });
            }
            
            // Update and return the new document with populated references
            const updatedQuestion = await Question.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            ).populate('type', 'name description')
              .populate('category', 'name');
            
            res.status(200).json({
                success: true,
                data: updatedQuestion
            });
        } catch (error) {
            // Handle validation errors
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map(val => val.message);
                return res.status(400).json({
                    success: false,
                    message: messages.join(', ')
                });
            }
            
            // Handle invalid ID format
            if (error.kind === 'ObjectId') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid question ID format"
                });
            }
            
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },

    deleteQuestion: async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);
            
            // Check if question exists
            if (!question) {
                return res.status(404).json({
                    success: false,
                    message: "Question not found"
                });
            }
            
            await Question.findByIdAndDelete(req.params.id);
            
            res.status(200).json({
                success: true,
                message: "Question deleted successfully",
                data: question
            });
        } catch (error) {
            // Handle invalid ID format
            if (error.kind === 'ObjectId') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid question ID format"
                });
            }
            
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    }
};

export default questionController;