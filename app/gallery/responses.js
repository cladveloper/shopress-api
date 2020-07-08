// package
const boom = require('@hapi/boom');
// imports
const {config} = require('../../config');
const FilesService = require('./services.files');
const {storage} = require('./config.storage');
// global vars
const fileService = new FilesService();
const nameFolder = 'uploads';
const rootFolder = `public/${nameFolder}`;

const uploadImages = () => {
    return(req,res,next) => {
        const {collection} = req.params;
        const {id} = req.params;
        const folder = `${rootFolder}/${collection}/${id}/`;
        fileService.uploadFile(req, 'array', 'images', storage(folder))
        .then(files => res.json(files))
        .catch(err => next(boom.badImplementation(err)));
    }
}
const deleteImageByName = () => {
    return(req,res,next) => {
        const {collection,id,name} = req.params;
        const folder = `${rootFolder}/${collection}/${id}/${name}`;
        fileService.deleteFile(folder)
        .then(() => res.json({ok: true}))
        .catch(err => next(boom.badImplementation(err)))
    }
}
const deleteImagesByFolder = () => {
    return(req,res,next) => {
        const {collection,id} = req.params;
        const folder = `${rootFolder}/${collection}/${id}`;
        fileService.deleteFolderRecursive(folder)
        .then(() => res.json({ok: true}))
        .catch(err => next(boom.badImplementation(err)))
    }
}

const getImagesByFolder = () => {
    return (req,res,next) => {
        const {collection,id} = req.params;
        const folder = `${rootFolder}/${collection}/${id}`;
        const route = `${config.productionRoute}/${nameFolder}/${collection}/${id}`;
        fileService.getFilesByFolder(folder, route)
        .then(images => res.json(images))
        .catch(err => next(boom.badImplementation(err)));
    }
}

module.exports = {
    uploadImages,
    deleteImageByName,
    deleteImagesByFolder,
    getImagesByFolder
}