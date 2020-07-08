const MongoLib = require('../../lib/mongo');

class ProductService{
    constructor(){
        this.mongoDB = new MongoLib('products');
    };


    // developers
    getAll(filters){
        return this.mongoDB.search(filters) || [];
    }
    
    getById(id){
        return this.mongoDB.findById(id) || {};
    }

    // admins
    create(body = {}){
        body['uploadDate'] = new Date().getTime();
        return this.mongoDB.create(body);
    }

    updateByIds(ids = [],body = {}){
        return this.mongoDB.update({_id: {$in: ids}}, body);
    }

    deleteByIds(ids = []){
        return this.mongoDB.delete({_id: {$in: ids}});
    }

}

module.exports = ProductService;