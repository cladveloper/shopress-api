const multer = require('multer');
const rimraf = require("rimraf");
const fs = require('fs');

class GalleryService{
  constructor(){};

  uploadFile(req, type = 'array', field = 'images', opts = { dest: 'uploads/' }){
    return new Promise((resolve,reject) => {
      const upload = multer(opts);
      const toUpload = upload[type](field);
      toUpload(req,'',(err) => {
        if(err) reject(err);
        else if(req.files) resolve(req.files);
        else resolve(req.file);
      })
    });
  };

  deleteFolderRecursive(folder){
    return new Promise((resolve,reject) => {
      rimraf(folder, function (err) { 
        if(err) reject(err);
        else resolve();
      });
    })
  };

  deleteFile(folder){
    return new Promise((resolve,reject) => {
      fs.unlink(folder, (err) => {
        resolve();
      })
    })
  };

  getFilesByFolder(folder = '', route = ''){
    return new Promise((resolve,reject) => {
      fs.readdir(folder, (err, files) => {
        if(err) resolve([]);
        else if(files){
            const arr = [];
            files.forEach(file => {
                const pathFile = `${route}/${file}`;
                arr.push(pathFile);
            });
            resolve(arr);
        }
      });
    })
  }

};

module.exports = GalleryService;