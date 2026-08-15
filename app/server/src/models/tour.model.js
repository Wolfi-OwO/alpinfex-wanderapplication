import mongoose from 'mongoose';

// Mongoose Schema
const Schema = mongoose.Schema;

const elevationSchema = new Schema({
    down: {
        type: Number,
        required: [true, 'Please enter the elevation descent (down)'],
    },
    up: {
        type: Number,
        required: [true, 'Please enter the elevation ascent (up)'],
    },
    min: {
        type: Number,
        required: [true, 'Please enter the minimum altitude (start)'],
    },
    max: {
        type: Number,
        required: [true, 'Please enter the maximum altitude'],
    },
});

// Schema for tour details
const detailsSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Please enter a valid tour description'],
    },
    arrivalRoute: {
        type: String,
        required: [true, 'Please enter a valid arrival route'],
    },
    equipment: {
        type: String,
        required: [true, 'Please enter a valid equipment'],
    },
    images: {
        ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Images',
            required: true,
        }],
        thumbnail: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Images',
            required: true,
        }
    },
    gpx_data: {
        elevation: {
            type: elevationSchema,
            required: [true, 'Please provide an elevation property!']
        },
        routes: [{
            distance: {
                total: {
                    type: Number,
                    min: 0,
                    required: [true, 'Please provide a total distance!']
                }
            },
            points: {
                type: Array,
                required: [true, 'Please provide points!']
            }
        }],
    },
});

// Main schema for the tour
const tourSchema = new Schema(
    {
        heading: {
            type: String,
            unique: true,
            required: [true, 'Please enter a tour name'],
        },
        type: {
            type: String,
            required: [true, 'Please enter the tour type'],
            enum: ['Wanderung', 'Hochtour', 'Skitour', 'Radtour'],
        },
        difficulty: {
            type: String,
            required: [true, 'Please enter the tour difficulty'],
            enum: ['Leicht', 'Mittel', 'Schwer'],
        },
        technique: {
            type: Number,
            required: [true, 'Please provide a technique score'],
            min: [1, 'Technique must be at least 1'],
            max: [5, 'Technique must be at most 5'],
        },
        condition: {
            type: Number,
            required: [true, 'Please provide a condition score'],
            min: [1, 'Condition must be at least 1'],
            max: [5, 'Condition must be at most 5'],
        },
        details: {
            type: detailsSchema, 
            required: [true, 'Please provide a details to a tour'],
        },
        timeStamp: {
            type: Date,
            default: Date.now,
        },
    }
);

const tourModel = mongoose.model('tours', tourSchema, 'Tours');
export default tourModel;
