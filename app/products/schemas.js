const Joi = require('@hapi/joi');
const {mongoJoi} = require('../schema.mongo');
const {config} = require('../../config');
const name = Joi.string().min(3).max(180);
const description = Joi.string().max(2500).allow('');
const price = Joi.number().min(0).max(999999999);
const stock = Joi.number().min(0).max(999999999).allow('');
const images = Joi.array();
const imageCover = Joi.string().uri().allow('');
const specifications = Joi.array().items(Joi.array().items(Joi.string().min(1).max(180).required()).min(2).max(2));
const sku = Joi.string().max(500).allow('');
const featured = Joi.boolean();
const published = Joi.boolean();
const stringToArrayObjectId = mongoJoi.transform().objectIdArray().allow('');
const tags = Joi.string().allow('');
const url = Joi.string().regex(/^[\w-]{1,50}$/);
const id = Joi.string().regex(/^[a-fA-F0-9]{24}$/);

const createProductSchema = Joi.object({
    name: name.required(),
    description,
    price: price.required(),
    images,
    imageCover,
    specifications,
    sku,
    featured: featured.default(false),
    categoriesIds: stringToArrayObjectId,
    tags,
    stock,
    url: url.required(),
    published: published.required(),
});

const updateProductSchema = Joi.object({
    name,
    description,
    price,
    images,
    imageCover,
    specifications,
    sku,
    featured,
    categoriesIds: stringToArrayObjectId,
    tags,
    stock,
    url: url,
    published,
});

const searchProductsSchema = Joi.object({
    text: Joi.string().min(1).max(180).allow('').trim(),
    page: Joi.number().min(1).allow(''),
    limit: Joi.number().min(1).max(Number(config.maxResultsPerPage)).allow(""),
    sort: mongoJoi.transform().sort('name', '-name', 'price', '-price', 'categoriesIds', '-categoriesIds', 'score', 'uploadDate', '-uploadDate', 'stock', '-stock', 'sku', '-sku',).allow(''),
    project: mongoJoi.transform().project('name', 'price', 'description', 'featured', 'images', 'imageCover', 'availableStock', 'sku', 'categoriesIds', 'uploadDate', 'stock', 'url').default({name: 1, price: 1, imageCover: 1}),
    categoriesIds: stringToArrayObjectId,
    featured: Joi.string().valid('yes','no').allow('')
});

const idsSchema = Joi.object({
    ids: stringToArrayObjectId,
});

const idSchema = Joi.object({
    id,
});

module.exports = {
    idsSchema,
    idSchema,
    createProductSchema,
    updateProductSchema,
    searchProductsSchema
}