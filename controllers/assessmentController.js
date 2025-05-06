import assessmentModel from "../models/assessmentModel.js";

const assessmentController = {

    createAssessment: async (req, res) => {
        try {
            const assessment = await assessmentModel.create(req.body);
            res.status(201).json({
                success: true,
                data: assessment
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    getAllAssessments: async (req, res) => {
        try {
            const assessments = await assessmentModel.find();
            res.status(200).json({
                success: true,
                data: assessments
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    getAssessment: async (req, res) => {
        try {
            const assessment = await assessmentModel.findById(req.params.id);
            res.status(200).json({
                success: true,
                data: assessment
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                error: error
            });
        }
    }
,
    updateAssessment: async (req, res) => {
        try {
            const assessment = await assessmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            res.status(200).json({
                success: true,
                data: assessment
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                error: error
            });
        }
    },
    deleteAssessment: async (req, res) => {
        try {
            const assessment = await assessmentModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                data: assessment
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

export default assessmentController