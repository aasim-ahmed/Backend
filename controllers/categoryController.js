import Category from '../models/Category.js';

const categoryController = {
  // Create a new category
  createCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      const savedCategory = await newCategory.save();
      
      res.status(201).json({
        success: true,
        data: savedCategory
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  },

  // Get all categories with optional filtering
  getAllCategories: async (req, res) => {
    try {
      // Extract query parameters for filtering
      const { is_active, parent } = req.query;
      
      // Build filter object
      const filter = {};
      if (is_active !== undefined) filter.is_active = is_active === 'true';
      if (parent === 'null') {
        filter.parent = null; // Root categories only
      } else if (parent) {
        filter.parent = parent; // Specific parent
      }
      
      // Find categories with filters
      const categories = await Category.find(filter)
        .populate('parent', 'name icon')
        .sort({ display_order: 1, name: 1 });
      
      res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  },

  // Get a single category by ID
  getCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id)
        .populate('parent', 'name icon');
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: category
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  },

  // Update a category
  updateCategory: async (req, res) => {
    try {
      // Prevent circular parent references
      if (req.body.parent === req.params.id) {
        return res.status(400).json({
          success: false,
          message: 'A category cannot be its own parent'
        });
      }
      
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('parent', 'name icon');
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: category
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  },

  // Delete a category
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      // Update any children to have null parent (optional)
      await Category.updateMany(
        { parent: req.params.id },
        { $set: { parent: null }}
      );
      
      res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error
      });
    }
  },

  // Get category hierarchy (optional)
  getCategoryHierarchy: async (req, res) => {
    try {
      // Get root categories
      const rootCategories = await Category.find({ parent: null, is_active: true })
        .sort({ display_order: 1, name: 1 });
      
      // Function to recursively get children
      const getChildrenRecursive = async (categories) => {
        for (let category of categories) {
          const children = await Category.find({ 
            parent: category._id,
            is_active: true 
          }).sort({ display_order: 1, name: 1 });
          
          category._doc.children = children;
          
          if (children.length > 0) {
            await getChildrenRecursive(children);
          }
        }
      };
      
      await getChildrenRecursive(rootCategories);
      
      res.status(200).json({
        success: true,
        data: rootCategories
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

export default categoryController;