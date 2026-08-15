import mongoose from 'mongoose';
/**
 * @typedef {Object} imageModel
 */

// Schema for elevation details
const imageSchema = mongoose.Schema(
    {
        buffer: {
            type: Buffer,
            required: [true, 'Please provide an image Buffer'],
        },
    }
);

const imageModel = mongoose.model('Images', imageSchema, 'Images');
export default imageModel;
