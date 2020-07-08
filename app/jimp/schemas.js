const Joi = require('@hapi/joi');

const url = Joi.string().uri();
const w = Joi.number().min(0).max(2000).default(100);
const h = Joi.number().min(0).max(2000).default(100);
const q = Joi.number().default(80).max(100);

const paramsSchema = Joi.object({
    url: url.required(),
    w,
    h,
    q,
});

module.exports = {
    paramsSchema
}