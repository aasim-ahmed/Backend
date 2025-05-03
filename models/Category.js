import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a category name'],
            trim: true,
            unique: true,
            maxlength: [50, 'Name cannot be more than 50 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [400, 'Description cannot be more than 200 characters']
        },
        icon: {
            type: String,
            trim: true
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null
        },
        is_active: {
            type: Boolean,
            default: true
        },
        display_order: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Indexes for better query performance
categorySchema.index({ is_active: 1 });
categorySchema.index({ display_order: 1 });
categorySchema.index({ parent: 1 });

// Virtual for getting child categories
categorySchema.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent'
});

const Category = mongoose.model('Category', categorySchema);

export default Category;