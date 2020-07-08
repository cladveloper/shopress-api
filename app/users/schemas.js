const Joi = require('@hapi/joi');
const id = Joi.string().regex(/^[a-fA-F0-9]{24}$/);
const username = Joi.string();
const password = Joi.string();

const idSchema = Joi.object({
    id: id.required(),
});

const authSchema = Joi.object({
    username: username.required(),
    password: password.required(),
});

module.exports = {
    idSchema,
    authSchema
}