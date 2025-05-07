import Question from "../models/Question.js";
import QuestionType from "../models/QuestionType.js";

const questionController = {
    createQuestion : async (req, res) => {
        try {
          const {
            questionText,
            questionType,
            options,
            difficulty,
            instruction,
            isMultiSelect,
            isLibrary,
          } = req.body;
      
          const newQuestion = new Question({
            questionText,
            questionType,
            options,
            difficulty,
            instruction,
            isMultiSelect,
            isLibrary,
            createdBy: req.user._id,
          });
      
          await newQuestion.save();
      
          res.status(201).json({ message: 'Question created', question: newQuestion });
        } catch (error) {
          res.status(500).json({ error: 'Failed to create question', details: error.message });
        }
      },
      getAllQuestions : async (req, res) => {
        try {
          const questions = await Question.find()
            .populate('questionType', 'name')
            .populate('createdBy', 'firstName lastName email');
      
          res.json({ questions });
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch questions', details: error.message });
        }
      },
      searchQuestions : async (req, res) => {
        try {
          const { type, difficulty, keyword, isLibrary } = req.query;
          const filters = {};
      
          if (type) filters.questionType = type;
          if (difficulty) filters.difficulty = difficulty;
          if (isLibrary !== undefined) filters.isLibrary = isLibrary === 'true';
          if (keyword) filters.questionText = { $regex: keyword, $options: 'i' };
      
          const questions = await Question.find(filters)
            .populate('questionType', 'name')
            .populate('createdBy', 'firstName lastName email');
      
          res.json({ questions });
        } catch (error) {
          res.status(500).json({ error: 'Search failed', details: error.message });
        }
      },
      getQuestionById : async (req, res) => {
        try {
          const question = await Question.findById(req.params.id)
            .populate('questionType', 'name')
            .populate('createdBy', 'firstName lastName email');
      
          if (!question) return res.status(404).json({ error: 'Question not found' });
      
          res.json({ question });
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch question', details: error.message });
        }
      },
      updateQuestion : async (req, res) => {
        try {
          const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
          if (!updated) return res.status(404).json({ error: 'Question not found' });
      
          res.json({ message: 'Question updated', question: updated });
        } catch (error) {
          res.status(500).json({ error: 'Failed to update question', details: error.message });
        }
      },
      deleteQuestion : async (req, res) => {
        try {
          const deleted = await Question.findByIdAndDelete(req.params.id);
          if (!deleted) return res.status(404).json({ error: 'Question not found' });
      
          res.json({ message: 'Question deleted' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete question', details: error.message });
        }
      }
};

export default questionController;