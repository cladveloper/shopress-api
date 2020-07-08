const boom = require('@hapi/boom');
const ProductService = require('./services');
const productService = new ProductService;

// developers
const getAllProducts  = () => {
    return (req,res,next) => {
        const {page,sort,limit,project,text,categoriesIds,featured} = req.query;
        const filter = {};
        const obj = {
            page,
            sort,
            limit,
            text,
            project,
            filter
        };
        if(categoriesIds) filter['categoriesIds'] = categoriesIds;
        if(featured == 'yes') filter['featured'] = true;
        if(featured == 'no') filter['featured'] = false;
        productService.getAll(obj)
        .then(products => res.json({
            results: products[0],
            totalResults: products[1],
            resultsPerPage: products[2]
        }))
        .catch(err => next(boom.badImplementation(err)));
    }
}

const getProductById = () => {
    return (req,res,next) => {
        const {id} = req.params;
        productService.getById(id)
        .then(product => product == null ? res.json({}) : res.json(product))
        .catch(err => next(boom.badImplementation(err)));
    }
}

// admins
const createProduct = () => {
    return (req,res,next) => {
        const {body} = req;
        productService.create(body)
        .then(p => res.json(body))
        .catch(err => next(boom.badImplementation(err)));
    }
}

const updateProductsByIds = () => {
    return (req,res,next) => {
        const {body} = req;
        const {ids} = req.params;
        productService.updateByIds(ids, body)
        .then(p => res.json(body))
        .catch(err => next(boom.badImplementation(err)));
    }
}

const deleteProductByIds = () => {
    return (req,res,next) => {
        const {ids} = req.params;
        productService.deleteByIds(ids)
        .then(r => res.json({success: true}))
        .catch(err => next(boom.badImplementation(err)));
    }
}

module.exports = {
    getAllProducts, getProductById, createProduct, updateProductsByIds, deleteProductByIds
}