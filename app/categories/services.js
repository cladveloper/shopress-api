const MongoLib = require('../../lib/mongo');

class CategoryService{
    constructor(){
        this.mongoDB = new MongoLib('categories');
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

    updateById(ids = [],body = {}){
        return this.mongoDB.update({_id: {$in: ids}}, body);
    }

    deleteById(ids = []){
        return this.mongoDB.delete({_id: {$in: ids}});
    }

}

module.exports = CategoryService;