import Image from '../models/image.model.js';

// Define Params for the variables for better hints detection
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const handleGet = async (req, res) => {
    const { tour } = req.params;
    try {
        let images = await Image.find({ tour: tour }).lean();

        res.status(200).json(images);
    } catch (error) {
        log(`Error when fetching tours! ${err.message}`, 'error')
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const handleGetByID = async (req, res) => {
    const { tour, id } = req.params;
    try {
        let images = await Image.find({ tour: tour }).lean();
        let image = images.filter((image) => image['_id'].toString().includes(id));
        res.status(200).json(image[0]);
    } catch (error) {
        log(`Error when fetching tour by id! ${err.message}`, 'error');
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

export { handleGet, handleGetByID };
