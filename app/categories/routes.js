// Packages
const express = require('express');
const router = express.Router();
// Imports
const validationHandler = require('../../utils/middlewares/validationHandler');
const {getAllCategories, getCategoryById, createCategory, updateCategoriesByIds, deleteCategoriesByIds} = require('./responses');
const {idSchema,idsSchema, createCategorySchema, searchCategorySchema, updateCategorySchema} = require('./schemas');

// developers routes
router.get('/', validationHandler(searchCategorySchema, "query"), getAllCategories());
router.get('/:id', validationHandler(idSchema, "params"), getCategoryById());
// admin routes
router.post('/', validationHandler(createCategorySchema), createCategory());
router.put('/:ids', validationHandler(idsSchema, 'params'), validationHandler(updateCategorySchema), updateCategoriesByIds());
router.delete('/:ids', validationHandler(idsSchema, "params"), deleteCategoriesByIds())

module.exports = router;