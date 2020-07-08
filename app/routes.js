const express = require('express');
const products = require('./products/routes');
const categories = require('./categories/routes');
const auth = require('./auth/routes');
const gallery = require('./gallery/routes');
const jimp = require('./jimp/routes');

function index(app){
    const router = express.Router();
    app.use('/', router);

    router.use('/products', products);
    router.use('/categories', categories);
    router.use('/gallery', gallery);
    router.use('/auth', auth);
    router.use('/jimp', jimp)
};

module.exports = index;