import Test from "../models/Test.js";  

const testController = {
    createTest : async (req, res) => {
        try {
          const {
            name,
            description,
            questionIds = [],
            timePerSection,
            totalQuestions,
            isLibraryTest,
          } = req.body;
      
          const newTest = new Test({
            name,
            description,
            questions: questionIds,
            timePerSection,
            totalQuestions,
            isLibraryTest,
            createdBy: req.user._id,
          });
      
          await newTest.save();
          res.status(201).json({ message: 'Test created', test: newTest });
        } catch (err) {
          res.status(500).json({ error: 'Failed to create test', details: err.message });
        }
      },
      
      // Get all tests
       getAllTests : async (req, res) => {
        try {
          const tests = await Test.find()
            .populate('questions')
            .populate('createdBy', 'firstName lastName email');
      
          res.json({ tests });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch tests', details: err.message });
        }
      },
      
      // Get a test by ID
       getTestById : async (req, res) => {
        try {
          const test = await Test.findById(req.params.id)
            .populate('questions')
            .populate('createdBy', 'firstName lastName email');
      
          if (!test) return res.status(404).json({ error: 'Test not found' });
      
          res.json({ test });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch test', details: err.message });
        }
      },
      
      // Update test
       updateTest : async (req, res) => {
        try {
          const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
      
          if (!updatedTest) return res.status(404).json({ error: 'Test not found' });
      
          res.json({ message: 'Test updated', test: updatedTest });
        } catch (err) {
          res.status(500).json({ error: 'Failed to update test', details: err.message });
        }
      },
      
      // Delete test
       deleteTest : async (req, res) => {
        try {
          const deleted = await Test.findByIdAndDelete(req.params.id);
      
          if (!deleted) return res.status(404).json({ error: 'Test not found' });
      
          res.json({ message: 'Test deleted' });
        } catch (err) {
          res.status(500).json({ error: 'Failed to delete test', details: err.message });
        }
      },
      
      // Add questions to test
       addQuestionsToTest : async (req, res) => {
        try {
          const test = await Test.findById(req.params.id);
          if (!test) return res.status(404).json({ error: 'Test not found' });
      
          const { questionIds } = req.body;
          test.questions.push(...questionIds);
          test.totalQuestions = test.questions.length;
      
          await test.save();
          res.json({ message: 'Questions added', test });
        } catch (err) {
          res.status(500).json({ error: 'Failed to add questions', details: err.message });
        }
      },
      
      // Remove question from test
      removeQuestionFromTest : async (req, res) => {
        try {
          const test = await Test.findById(req.params.id);
          if (!test) return res.status(404).json({ error: 'Test not found' });
      
          test.questions = test.questions.filter(
            (qid) => qid.toString() !== req.params.questionId
          );
          test.totalQuestions = test.questions.length;
      
          await test.save();
          res.json({ message: 'Question removed', test });
        } catch (err) {
          res.status(500).json({ error: 'Failed to remove question', details: err.message });
        }
      }
};

export default testController;