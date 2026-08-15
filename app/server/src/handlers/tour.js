import { tryParsingIntegers } from './../util/parse.js';
import Tour from '../models/tour.model.js';
import { xml2gpxWorkout } from './../util/xml2gpx.js';
import { log } from '../util/Logger.js';
import Mongoose from 'mongoose';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// Handle GET request to retrieve all tours
const handleGet = async (req, res) => {
    try {
        let query = Tour.find().sort({timeStamp: 1});
        query = query.populate('details.images.thumbnail');
        const tours = await query.lean();
        res.status(200).json(tours);
    } catch (err) {
        log(`Error when fetching tours! ${err.message}`, 'error');
        return res.status(500).json({
            'status-code': 500,
            message: `Error when fetching tours`,
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// Handle GET request by ID
const handleGetByID = async (req, res) => {
    const { id } = req.params;
    try {
        let query = Tour.findById(id);
        query = query.populate('details.images.ids');
        const tour = await query.lean();
        if (!tour) {
            log(`Tour not found!`, 'warn');
            return res.status(404).json({
                'status-code': 404,
                message: `Tour with the id ${id} not found`,
            });
        }
        res.status(200).json(tour);
    } catch (err) {
        log(`Error when fetching tours! ${err.message}`, 'error');
        return res.status(500).json({
            'status-code': 500,
            message: `Error when fetching tour with the id ${id} not found! ${err.message}`,
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// Handle POST request to create a new tour
const handlePost = async (req, res) => {
    try {
        const gpx_file = req.file;
        await validateRequestFiles({ content: req.body, xml_file: gpx_file });

        // Retrieve data from the form
        const gpx_buffer = Buffer.from(gpx_file.buffer);

        // Parse the GPX file
        const gpx = await xml2gpxWorkout(gpx_buffer);

        const formdata = req.body;
        const elevationObj = gpx.routes[0].points.reduce(
            (prevVal, curVal) => {
                const { height } = curVal;
                if (prevVal.lastHeight === 0) {
                    prevVal.lastHeight = height;
                }

                if (prevVal.lastHeight < height) {
                    prevVal.up += Math.abs(height - prevVal.lastHeight);
                }

                if (prevVal.lastHeight > height) {
                    prevVal.down += Math.abs(height - prevVal.lastHeight);
                }
                prevVal.lastHeight = height;
                return prevVal;
            },
            { up: 0, down: 0, lastHeight: 0 },
        );

        const tour_obj = {
            heading: formdata.heading,
            type: formdata.type,
            difficulty: formdata.difficulty,
            technique: formdata.technique,
            condition: formdata.condition,
            details: {
                images: {
                    thumbnail: formdata?.ids[0],
                    ids: formdata?.ids,
                },
                description: formdata.description,
                arrivalRoute: formdata.arrivalRoute,
                equipment: formdata.equipment,
                gpx_data: {
                    routes: gpx.routes,
                    elevation: {
                        up: parseInt(elevationObj.up).toFixed(0),
                        down: parseInt(elevationObj.down).toFixed(0),
                        min: parseInt(gpx.elevation.min).toFixed(0),
                        max: parseInt(gpx.elevation.max).toFixed(0),
                    },
                },
            },
        };
        log(`Successfully creating a new tour!`, 'info');
        const newTour = new Tour(tour_obj)
        const savedTour = await newTour.save();
        res.status(201).location(`/api/tours/${savedTour['_id']}`).json(savedTour);
    } catch (err) {

        if (err instanceof Mongoose.Error.ValidationError) {
            log(`Error when creating tour! ${err}`, 'error');
            return res.status(400).json({
                'status-code': 400,
                message: `${err.message}`,
            });
        } else {
            log(`Error when creating tour! ${err}`, 'error');
            return res.status(500).json({
                'status-code': 500,
                message: `${err.message}`,
            });
        }

       
    }
};

// Validate the uploaded files
async function validateRequestFiles(body) {
    if (
        !body?.xml_file ||
        (body?.xml_file?.mimetype !== 'application/gpx+xml' &&
            body.xml_file.mimetype !== 'application/octet-stream')
    ) {
        throw new Error('Validation failed: no xml file uploaded!');
    }

    if (
        body.content.ids == null
    ) {
        throw new Error('Validation failed: no imageIds provided!');
    }

    try {
        await tryParsingIntegers(body.content.technique);
    } catch {
        throw new Error('Validation failed: technique must be a Number!');
    }

    try {
        await tryParsingIntegers(body.content.condition);
    } catch {
        throw new Error('Validation failed: condition must be a Number');
    }

    try {
        await tryParsingIntegers(body.content.duration);
    } catch {
        throw new Error('Validation failed: duration must be a Number');
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// Handle DELETE request to remove a tour
const handleDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findByIdAndDelete(id).lean();
        if (!tour) {
            log(`Tour not found!`, 'warn');
            return res.status(404).json({
                'status-code': 404,
                message: `Could not delete tour with the id ${id}`,
            });
        }

        log(`Successfully deleted tour with id ${id}`, 'info');
        res.sendStatus(204)
    } catch (err) {
        log(`Error when deleting tour! ${err.message}`, 'error');
        res.status(500).json({
            'status-code': 500,
            message: err.message,
        });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const handleUpdate = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedTour = req.body;
        
        const tour = await Tour.findByIdAndUpdate(id, updatedTour);

        if (!tour) {
            log(`Tour not found!`, 'warn');
            return res.status(404).json({
                'status-code': 404,
                message: `Could not update the tour with the id ${id}!`,
            });
        }

        res.status(200).json(tour);
    } catch (err) {
        if (err instanceof Mongoose.Error.ValidationError) {
            log(`Error when updating tour! ${err.message}`, 'error');
            return res.status(400).json({
                'status-code': 400,
                message: `${err.message}`,
            });
        } else {
            log(`Error when updating tour! ${err.message}`, 'error');
            return res.status(500).json({
                'status-code': 500,
                message: `${err.message}`,
            });
        }
    }
}

export { handleGet, handleGetByID, handlePost, handleDelete, handleUpdate };
