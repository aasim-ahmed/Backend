import Answer from "../models/Answer.js";

const answerController = {
    submitAnswer: async (req, res) => {
        try {
            const answer = await Answer.create(req.body);
            res.status(201).json({
                success: true,
                data: answer
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
    
    getAnswers: async (req, res) => {
        try {
            // Support for pagination and filtering
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            
            // Build query based on filters
            let query = {};
            
            if (req.query.questionId) {
                query.question = req.query.questionId;
            }
            
            if (req.query.userId) {
                query.user = req.query.userId;
            }
            
            // Execute query with pagination
            const answers = await Answer.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
                
            // Get total count for pagination
            const total = await Answer.countDocuments(query);
            
            res.status(200).json({
                success: true,
                count: answers.length,
                total,
                pagination: {
                    page,
                    pages: Math.ceil(total / limit)
                },
                data: answers
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },
    
    getAnswer: async (req, res) => {
        try {
            const answer = await Answer.findById(req.params.id);
            
            // Check if answer exists
            if (!answer) {
                return res.status(404).json({
                    success: false,
                    message: "Answer not found"
                });
            }
            
            res.status(200).json({
                success: true,
                data: answer
            });
        } catch (error) {
            // Handle invalid ID format
            if (error.kind === 'ObjectId') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid answer ID format"
                });
            }
            
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },
    
    updateAnswer: async (req, res) => {
        try {
            const answer = await Answer.findById(req.params.id);
            
            // Check if answer exists
            if (!answer) {
                return res.status(404).json({
                    success: false,
                    message: "Answer not found"
                });
            }
            
            // Update and return the new document
            const updatedAnswer = await Answer.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            
            res.status(200).json({
                success: true,
                data: updatedAnswer
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
                    message: "Invalid answer ID format"
                });
            }
            
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },
    
    deleteAnswer: async (req, res) => {
        try {
            const answer = await Answer.findById(req.params.id);
            
            // Check if answer exists
            if (!answer) {
                return res.status(404).json({
                    success: false,
                    message: "Answer not found"
                });
            }
            
            await Answer.findByIdAndDelete(req.params.id);
            
            res.status(200).json({
                success: true,
                message: "Answer deleted successfully",
                data: answer
            });
        } catch (error) {
            // Handle invalid ID format
            if (error.kind === 'ObjectId') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid answer ID format"
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

export default answerController;