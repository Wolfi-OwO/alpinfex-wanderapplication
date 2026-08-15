import express from 'express';
const router = express.Router();

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

import { handleGet, handleGetByID, handlePost, handleDelete } from '../handlers/tour.js';
('../handlers/tour.js');

router.get('/tours', handleGet);

router.get('/tours/:id', handleGetByID);

router.post('/tours', upload.single('xml_file'), handlePost);

router.delete('/tours/:id', handleDelete);

export default router;
