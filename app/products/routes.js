// Packages
const express = require('express');
const router = express.Router();
// Imports
const validationHandler = require('../../utils/middlewares/validationHandler');
const {getAllProducts, getProductById, createProduct, updateProductsByIds, deleteProductByIds} = require('./responses');
const {idSchema,idsSchema,createProductSchema, searchProductsSchema, updateProductSchema} = require('./schemas');

// developers routes
router.get('/', validationHandler(searchProductsSchema, "query"), getAllProducts());
router.get('/:id', validationHandler(idSchema, "params"), getProductById());
// admin routes
router.post('/', validationHandler(createProductSchema), createProduct());
router.put('/:ids', validationHandler(idsSchema, 'params'), validationHandler(updateProductSchema), updateProductsByIds());
router.delete('/:ids', validationHandler(idsSchema, "params"), deleteProductByIds())

module.exports = router;