import assessmentModel from "../models/assessmentModel.js";

const assessmentController = {

    createAssessment : async (req, res) => {
        try {
          const { name, description, tests = [], instructions } = req.body;
      
          // Calculate total time from tests
          const testDocs = await Test.find({ _id: { $in: tests } });
          const totalTime = testDocs.reduce((acc, test) => {
            const sectionTimes = test.timePerSection || {};
            const sectionSum = Array.from(sectionTimes.values()).reduce((a, b) => a + b, 0);
            return acc + sectionSum;
          }, 0);
      
          const newAssessment = new Assessment({
            name,
            description,
            tests,
            instructions,
            createdBy: req.user._id,
            totalTime,
          });
      
          await newAssessment.save();
          res.status(201).json({ message: 'Assessment created', assessment: newAssessment });
        } catch (err) {
          res.status(500).json({ error: 'Failed to create assessment', details: err.message });
        }
      },
      getAllAssessments : async (req, res) => {
        try {
          const assessments = await Assessment.find()
            .populate('tests')
            .populate('createdBy', 'firstName lastName email');
          res.json({ assessments });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch assessments', details: err.message });
        }
      },
      getAssessmentById : async (req, res) => {
        try {
          const assessment = await Assessment.findById(req.params.id)
            .populate('tests')
            .populate('createdBy', 'firstName lastName email');
      
          if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
      
          res.json({ assessment });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch assessment', details: err.message });
        }
      }
,
updateAssessment : async (req, res) => {
    try {
      const updated = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updated) return res.status(404).json({ error: 'Assessment not found' });
  
      res.json({ message: 'Assessment updated', assessment: updated });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update assessment', details: err.message });
    }
  },
  
  // Delete an assessment
   deleteAssessment : async (req, res) => {
    try {
      const deleted = await Assessment.findByIdAndDelete(req.params.id);
  
      if (!deleted) return res.status(404).json({ error: 'Assessment not found' });
  
      res.json({ message: 'Assessment deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete assessment', details: err.message });
    }
  },
  
  // Clone assessment (creates a new one with same tests and instructions)
   cloneAssessment : async (req, res) => {
    try {
      const original = await Assessment.findById(req.params.id);
      if (!original) return res.status(404).json({ error: 'Original assessment not found' });
  
      const cloned = new Assessment({
        name: `${original.name} (Cloned)`,
        description: original.description,
        instructions: original.instructions,
        tests: original.tests,
        createdBy: req.user._id,
        totalTime: original.totalTime,
      });
  
      await cloned.save();
      res.status(201).json({ message: 'Assessment cloned', assessment: cloned });
    } catch (err) {
      res.status(500).json({ error: 'Failed to clone assessment', details: err.message });
    }
  }
   

};

export default assessmentController