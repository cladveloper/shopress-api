const {diskStorage} = require('multer');
const fs = require('fs');

const storage = (dir) => {
    return {
        storage: diskStorage({
            destination: function (req, file, cb) {
                fs.access(dir, function(err) {
                    if (err && err.code === 'ENOENT') {
                        fs.mkdir(dir, function(err){
                            if(err){
                                console.log(err);
                            }
                            cb(null,dir);
                        });
                    } else{
                        cb(null,dir);
                    }
                });
            },
            filename: (req, file, cb) => {
                const originalFileName = file.originalname;
                const originalFileNameSplit = originalFileName.split(".");
                const extname = originalFileNameSplit.pop();
                const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + extname;
                cb(null, fileName);
            }
        }),
        limits: {fileSize: 1000000},
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
            if(!allowedTypes.includes(file.mimetype)){
                const error = new Error('INCORRECT_FILETYPE');
                error.code = "INCORRECT_FILETYPE";
                return cb(error, false);
            };

            cb(null,true);
        }
    }
};

module.exports = {storage};