const Joi = require('@hapi/joi');

const id = Joi.string().regex(/^[a-fA-F0-9]{24}$/);
const collection = Joi.string().valid('products', 'categories');
const name = Joi.string();

const paramsSchema = Joi.object({
    id,
    collection,
    name,
});

module.exports = {
    paramsSchema
}