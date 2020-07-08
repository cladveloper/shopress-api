// Packages
const express = require('express');
const router = express.Router();
// Imports
const validationHandler = require('../../utils/middlewares/validationHandler');
const {resizeImage,ratioImage} = require('./responses');
const {paramsSchema} = require('./schemas');

// developers routes
router.get('/resize', validationHandler(paramsSchema, "query"), resizeImage());
router.get('/scale', validationHandler(paramsSchema, "query"), ratioImage());

module.exports = router;