const boom = require('@hapi/boom');
const CategoryService = require('./services');
const categoryService = new CategoryService;

// developers
const getAllCategories  = () => {
    return (req,res,next) => {
        const {page,sort,limit,project,text,url} = req.query;
        const filter = {};
        const obj = {
            page,
            sort,
            limit,
            text,
            project,
            filter,
        };
        if(url) filter['url'] = url;
        categoryService.getAll(obj)
        .then(categories => res.json({
            results: categories[0],
            totalResults: categories[1],
            resultsPerPage: categories[2]
        }))
        .catch(err => next(boom.badImplementation(err)));
    }
}

const getCategoryById = () => {
    return (req,res,next) => {
        const {id} = req.params;
        categoryService.getById(id)
        .then(category => category == null ? res.json({}) : res.json(category))
        .catch(err => next(boom.badImplementation(err)));
    }
}

// admins
const createCategory = () => {
    return (req,res,next) => {
        const {body} = req;
        categoryService.create(body)
        .then(p => res.json(body))
        .catch(err => next(boom.badImplementation(err)));
    }
}

const updateCategoriesByIds = () => {
    return (req,res,next) => {
        const {body} = req;
        const {ids} = req.params;
        categoryService.updateById(ids, body)
        .then(p => res.json(body))
        .catch(err => next(boom.badImplementation(err)));
    }
}

const deleteCategoriesByIds = () => {
    return (req,res,next) => {
        const {ids} = req.params;
        categoryService.deleteById(ids)
        .then(r => res.json({success: true}))
        .catch(err => next(boom.badImplementation(err)));
    }
};

module.exports = {
    getAllCategories, getCategoryById, createCategory, updateCategoriesByIds, deleteCategoriesByIds
}