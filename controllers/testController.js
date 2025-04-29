import Test from "../models/Test.js";  

const testController = {
    createTest: async (req, res) => {
        try {
            const newTest = await Test.create(req.body);
            res.status(201).json({  // Changed to 201 for resource creation
                success: true,
                message: "Test created successfully",
                data: newTest
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

    getTests: async (req, res) => {
        try {
            // Support for pagination and filtering
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            
            // Build query based on filters
            let query = {};
            
            if (req.query.title) {
                query.title = { $regex: req.query.title, $options: 'i' };  // Case-insensitive search
            }
            
            if (req.query.category) {
                query.category = req.query.category;
            }
            
            if (req.query.is_active !== undefined) {
                query.is_active = req.query.is_active === 'true';
            }
            
            // Execute query with pagination
            const tests = await Test.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
                
            // Get total count for pagination
            const total = await Test.countDocuments(query);
            
            res.status(200).json({
                success: true,
                count: tests.length,
                total,
                pagination: {
                    page,
                    pages: Math.ceil(total / limit)
                },
                data: tests
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },

    getTestById: async (req, res) => {  // Fixed syntax error
        try {
            const test = await Test.findById(req.params.id);
            
            // Check if test exists
            if (!test) {
                return res.status(404).json({
                    success: false,
                    message: "Test not found"
                });
            }
            
            res.status(200).json({
                success: true,
                data: test
            });
        } catch (error) {
            // Handle invalid ID format
            if (error.kind === 'ObjectId') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid test ID format"
                });
            }
            
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },

    updateTest: async (req, res) => {  // Added missing update method
        try {
            const test = await Test.findById(req.params.id);
            
            // Check if test exists
            if (!test) {
                return res.status(404).json({
                    success: false,
                    message: "Test not found"
                });
            }
            
            // Update and return the new document
            const updatedTest = await Test.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            
            res.status(200).json({
                success: true,
                message: "Test updated successfully",
                data: updatedTest
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
                    message: "Invalid test ID format"
                });
            }
            
            res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    },
    
    deleteTest: async (req, res) => {
        try {
            const test = await Test.findById(req.params.id);
            
            // Check if test exists
            if (!test) {
                return res.status(404).json({
                    success: false,
                    message: "Test not found"
                });
            }
            
            await Test.findByIdAndDelete(req.params.id);
            
            res.status(200).json({
                success: true,
                message: "Test deleted successfully",
                data: test
            });
        } catch (error) {
            // Handle invalid ID format
            if (error.kind === 'ObjectId') {
                return res.status(400).json({
                    success: false,
                    message: "Invalid test ID format"
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

export default testController;