import { connectToDatabase, dropCurrentDatabase } from './src/database/database.js';
import tourRouter from './src/routes/tour.js';
import imageRouter from './src/routes/image.js';
import { log } from './src/util/Logger.js';
import { fileURLToPath } from 'url';
import express from 'express';
import dotEnv from 'dotenv';
import path from 'path';
import cors from 'cors';
import http from 'http';

// Initialize app component
dotEnv.config();
const app = express();

// Get the hostname and port from the .env file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONGODB_DATABASEURL = process.env.MONGO_URL || 'mongodb://localhost:27017/_tour';
const HOSTNAME = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8080';

// apply config
app.use(express.static(path.join(__dirname, '/../', 'client', 'dist')));
app.use(express.json());
app.use(cors());

// Middleware for logging incoming requests
const logCurrentRequestDateAndTime = (_req, _res, next) => {
    log( 
        ` ... Received Request - ${new Date()
            .toLocaleString()
            .replace(',', '')} ...`, 'info');
    next();
};

// Implement React routing with regex
/* ^(?!\/api).*

    ^ -> At the starting of the relative url
    (?!) -> negation of the regex
    \/ -> escapes the / character in order to be useable
    api -> checks if the next sequence of chars equals that
    . -> any characters (except line terminations)
    * -> unlimited amount of characters

*/

// Set the only route for the frontend. Everything else will be handled by react.
app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(__dirname, '/../', 'client', 'dist', 'index.html'));
});

// Set backend routes
app.use('/api', tourRouter);
app.use('/api', imageRouter);

log(`Starting application with environment ${process.env.NODE_ENV}`, 'info', true);

if (process.env.NODE_ENV == '') app.use(logCurrentRequestDateAndTime);

await connectToDatabase(MONGODB_DATABASEURL);

app.databaseConfig = {
    dropCurrentDatabase,
    connectionString: MONGODB_DATABASEURL
}

app.listen(PORT, HOSTNAME, () => {
    log( `App listening on http://${HOSTNAME}:${PORT}/`,'info', true);
})

export default app;
