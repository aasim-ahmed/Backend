import QuestionType from '../models/QuestionType.js';

const questionTypeController = {
  // Create a new question type
  createQuestionType : async (req, res) => {
    try {
      const newType = new QuestionType(req.body);
      const saved = await newType.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all question types with optional filtering
  getAllQuestionTypes: async (req, res) => {
    try {
      // Extract query parameters for filtering
      const { is_active } = req.query;
      
      // Build filter object
      const filter = {};
      if (is_active !== undefined) filter.is_active = is_active === 'true';
      
      // Find question types with filters
      const questionTypes = await QuestionType.find(filter)
        .sort({ display_order: 1, name: 1 });
      
      res.status(200).json({
        success: true,
        count: questionTypes.length,
        data: questionTypes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  },

  // Get a single question type by ID
  getQuestionType: async (req, res) => {
    try {
      const questionType = await QuestionType.findById(req.params.id);
      
      if (!questionType) {
        return res.status(404).json({
          success: false,
          message: 'Question type not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: questionType
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  },

  // Update a question type
  updateQuestionType: async (req, res) => {
    try {
      const questionType = await QuestionType.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!questionType) {
        return res.status(404).json({
          success: false,
          message: 'Question type not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: questionType
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  },

  // Delete a question type
  deleteQuestionType: async (req, res) => {
    try {
      const questionType = await QuestionType.findByIdAndDelete(req.params.id);
      
      if (!questionType) {
        return res.status(404).json({
          success: false,
          message: 'Question type not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Question type deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  }
};

export default questionTypeController;