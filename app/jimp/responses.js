const boom = require('@hapi/boom');
const Jimp = require("jimp")


const resizeImage = () => {
    return(req,res,next) => {
        const {url,w,h,q} = req.query;
        Jimp.read(url)
        .then(image => {
            image.cover(w,h).quality(q).getBuffer(Jimp.AUTO, (err,imageConvert) => {
                if(err) next(boom.badImplementation(err));
                res.end(imageConvert);
            });
        })
        .catch(err => next(boom.badImplementation(err)));
    }
};

const ratioImage = () => {
    return(req,res,next) => {
        const {url,w,q} = req.query;
        Jimp.read(url)
        .then(image => {
            image.resize(w, Jimp.AUTO).quality(q).getBuffer(Jimp.AUTO, (err,imageConvert) => {
                if(err) next(boom.badImplementation(err));
                res.end(imageConvert);
            });
        })
        .catch(err => next(boom.badImplementation(err)));
    }
};

module.exports = {
    resizeImage,
    ratioImage
}