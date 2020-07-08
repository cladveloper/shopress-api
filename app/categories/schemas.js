const Joi = require('@hapi/joi');
const {mongoJoi} = require('../schema.mongo');
const {config} = require('../../config');
const name = Joi.string().min(1).max(180);
const description = Joi.string().min(1).max(2500).allow('');
const image = Joi.string().uri().allow('');
const icon = Joi.string().uri().allow('');
const stringToArrayObjectId = mongoJoi.transform().objectIdArray().allow('');
const url = Joi.string().regex(/^[\w-]{1,50}$/);
const featured = Joi.boolean();
const id = Joi.string().regex(/^[a-fA-F0-9]{24}$/);

const createCategorySchema = Joi.object({
    name: name.required(),
    description,
    image,
    icon,
    url: url.required(),
    featured
});

const updateCategorySchema = Joi.object({
    name,
    description,
    image,
    icon,
    url,
    featured
});

const searchCategorySchema = Joi.object({
    text: Joi.string().min(1).max(180).allow(''),
    page: Joi.number().min(1).allow(''),
    limit: Joi.number().min(1).max(Number(config.maxResultsPerPage)).allow(""),
    sort: mongoJoi.transform().sort('name', '-name', 'uploadDate', '-uploadDate').allow(''),
    url,
    project: mongoJoi.transform().project('image', 'icon', 'name', 'description', 'uploadDate', 'url', 'featured').default({name: 1, icon: 1}),
});

const idsSchema = Joi.object({
    ids: stringToArrayObjectId,
});

const idSchema = Joi.object({
    id,
});

module.exports = {
    idSchema,
    idsSchema,
    createCategorySchema,
    updateCategorySchema,
    searchCategorySchema
}