import { log } from '../util/Logger.js';
import mongoose from 'mongoose';
import tours from '../../tests/data/tours/tours.js';
import Tour from '../models/tour.model.js';


const dbConnectTimeout = 5000;


async function connectToDatabase(connectionString, recreateDatabase = false) {

    try {

        log(`Setting up connection to database using ${connectionString}`, 'info', true);

        if (recreateDatabase) {
            await dropCurrentDatabase(connectionString);
        }

        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: dbConnectTimeout,
        });

        log('Connected to Database', 'info', true);
    }
    catch (err) {
        log(`Unable to setup connection ${err.message}`, 'error', true)
        process.exit(1);
    }
}

async function dropCurrentDatabase(connectionString) {
    log(`Dropping current database`, 'warn');

    let connection = await mongoose.createConnection(connectionString, {
        serverSelectionTimeoutMS: dbConnectTimeout
    }).asPromise();

    await connection.dropDatabase();

    log(`Current database dropped`);
}

function convertObjectIdsToStrings(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => convertObjectIdsToStrings(item));
    }

    if (obj && typeof obj === 'object' && !(obj instanceof mongoose.Types.ObjectId)) {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = convertObjectIdsToStrings(obj[key]);
            }
        }
        return result;
    }

    if (obj instanceof mongoose.Types.ObjectId) {
        return obj.toString();
    }

    return obj;
}

async function fillDemoData() {
    try {
        await Tour.deleteMany();
        const createdTours = [];

        for (let index = 0; index < 3; index++) {
            console.log()
            const newTour = new Tour(tours[index]);
            const savedTour = await newTour.save();

            // Convert the document to a plain JavaScript object
            const tourObject = savedTour.toObject({
                // Ensure _id is converted to a string
                transform: (doc, ret) =>  convertObjectIdsToStrings(ret)
            });

            createdTours.push(tourObject);
        }

        return createdTours;
    } catch (error) {
        log(`Fehler beim einfügen der Demo Daten: ${error.message}`, 'error');
    }
}


export { connectToDatabase, dropCurrentDatabase, fillDemoData };
