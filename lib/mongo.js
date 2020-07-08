// set DEBUG=app:* & node .rest/lib/mongov2.js

const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor(collection) {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
        this.collection = collection;
    }

    connect() {
        if (!MongoLib.connection) {
        MongoLib.connection = new Promise((resolve, reject) => {
            this.client.connect(err => {
            if (err) {
                reject(err);
            }

            console.log('Connected succesfully to mongo');
            resolve(this.client.db(this.dbName));
            });
        });
    }
        return MongoLib.connection;
    }

    test(){
        return this.connect().then(db => {
            return db.collection(this.collection);
        });
    };

    find(query = {}, exludes = {}) { // buscar según parámetros
        return this.connect().then(db => {
            return db.collection(this.collection).find(query, exludes).toArray();
        });
    };

    findById(id = "") { // buscar según id
        return this.connect().then(db => {
            return db.collection(this.collection).findOne({ _id: ObjectId(id) });
        });
    }

    create(document = {}) { // crear un solo documento
        return this.connect()
        .then(db => {
            return db.collection(this.collection).insertOne(document);
        });
    }

    createMany(documents = []) { // crear varios documentos
    return this.connect()
        .then(db => {
            return db.collection(this.collection).insertMany(documents);
        });
    };

    update(query = {}, update = {}, onlySet = true, options = {}){ // actualizar según filtro
        let data = onlySet ? {$set: update} : update;
        return this.connect()
        .then(db => {
            return db
            .collection(this.collection)
            .updateMany(query, data, options)
        })
    }

    updateById(id = "", update = {}, onlySet = true, options = {}){ // actualizar según filtro
        let data = onlySet ? {$set: update} : update;
        return this.connect()
        .then(db => {
            return db
            .collection(this.collection)
            .updateOne({_id: ObjectId(id)}, data, options)
        })
    }

    delete(filter = {}) {
        return this.connect()
        .then(db => {
            return db.collection(this.collection).deleteMany(filter);
        })
    }

    deleteById(id = "") {
        return this.connect()
        .then(db => {
            return db.collection(this.collection).deleteOne({_id: ObjectId(id)});
        })
    };

    aggregate(query = []){
        return this.connect()
        .then(db => {
            return db.collection(this.collection).aggregate(query).toArray();
        })
    };
    
    search(obj = {}){
        obj = {page: obj.page || 1,sort: obj.sort || {_id: -1},text: obj.text || "", filter: obj.filter || {}, project: obj.project || {}, limit: obj.limit || Number(config.maxResultsPerPage)};
        
        const page = obj.page;
        const limit = obj.limit;
        const skip = limit * (page - 1);
        const filter = obj.filter;
        let sort = obj.sort;
        let text = {};
        let opts = {};
        let project = obj.project;

        if(obj.text.length > 0){
            text = { $text: {$search: obj.text}};
            opts = {score: {$meta: "textScore"}};
        };

        if(Object.keys(obj.sort).length > 0){
            if(Object.keys(obj.sort)[0] == 'score'){
                sort = { score: {$meta: "textScore"}};
            } else{
                sort = obj.sort;
            }
        };

        return this.connect()
        .then(db => {
            const documents = db.collection(this.collection).find({...text, ...filter}, {projection: {...opts, ...project}}).sort(sort).skip(skip).limit(limit).toArray();
            const countDocuments = Object.keys(text) > 0 || Object.keys(filter).length > 0 ? db.collection(this.collection).countDocuments({...text, ...filter}) : db.collection(this.collection).estimatedDocumentCount();
            return Promise.all([documents, countDocuments, limit])
        })
    };

    index(obj = {}, opts = {}){
        return this.connect()
        .then(db => {
            return db.collection(this.collection).createIndex(obj, opts)
            .then(db => console.log(`Se ha creado el/los indice/s para ${this.collection}`))
            .catch(err => {
                console.log(err);
                console.log(`No se ha podido crear el/los índice/s para ${this.collection}:c`);
            })
        })
    };

    dropIndexes(obj = {}, opts = {}){
        return this.connect()
        .then(db => {
            return db.collection(this.collection).dropIndexes()
            .then(db => console.log(`Se han eliminado todos los índices para ${this.collection}`))
            .catch(err => {
                console.log(err);
                console.log(`No se ha podido eliminar los índices para ${this.collection}:c`);
            })
        })
    }
};

module.exports = MongoLib;