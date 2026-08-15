import express from 'express';
const router = express.Router();

import { handleGet, handleGetByID } from '../handlers/image.js';

const GetAll = router.get('/images/', handleGet);

const GetByID = router.get('/images/:id', handleGetByID);

const GetByTour = router.get('/images/:tour', handleGetByID);

const Post = router.get('/images/:')

export default router;
