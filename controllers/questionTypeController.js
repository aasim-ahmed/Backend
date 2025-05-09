import QuestionType from '../models/QuestionType.js';
import User from '../models/User.js';

const questionTypeController = {
  

  getAllQuestionTypes: async (req, res) => {
    try {
      const types = await QuestionType.find().populate('createdBy', 'firstName lastName email');
      res.json({ types });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch question types', details: err.message });
    }
  },
  searchQuestionTypes: async (req, res) => {
    try {
      const { search } = req.query;
      const questionTypes = await QuestionType.find({ name: { $regex: search, $options: 'i' } });
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
      const type = await QuestionType.findById(req.params.id).populate('createdBy');
      if (!type) {
        return res.status(404).json({ error: 'Question type not found' });
      }
      res.json({ type });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch question type', details: err.message });
    }
  },

  updateQuestionType: async (req, res) => {
    try {
      const updated = await QuestionType.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ error: 'Question type not found' });
      }
      res.json({ message: 'Question type updated', type: updated });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update question type', details: err.message });
    }
  },

  
  createQuestionType: async (req, res) => {
    try {
      const { name, description,  } = req.body;
      console.log(req.user,"from question type controller");
      
      const createdBy = req.user._id;
      // Optional: Check if user exists
      const user = await User.findById(createdBy);
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }
  
      const existing = await QuestionType.findOne({ name });
      if (existing) {
        return res.status(400).json({ error: 'Question type already exists' });
      }
  
      const type = new QuestionType({ name, description, createdBy });
      await type.save();
  
      res.status(201).json({ message: 'Question type created', type });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create question type', details: err.message });
    }
  }
,  
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