// Packages
const express = require('express');
const router = express.Router();
// Imports
const validationHandler = require('../../utils/middlewares/validationHandler');
const {uploadImages, deleteImagesByFolder, deleteImageByName,getImagesByFolder} = require('./responses');
const {paramsSchema} = require('./schemas');

// developers routes
router.get('/:collection/:id', validationHandler(paramsSchema, 'params'), getImagesByFolder());
// admin routes
router.post('/:collection/:id', validationHandler(paramsSchema, 'params'), uploadImages());
router.delete('/:collection/:id', validationHandler(paramsSchema, 'params'), deleteImagesByFolder());
router.delete('/:collection/:id/:name', validationHandler(paramsSchema, 'params'), deleteImageByName());

module.exports = router;