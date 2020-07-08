// set DEBUG=app:* & node utils/scripts/createIndexes.js
const mongo = require('../../lib/mongo');
const products = new mongo('products');
const categories = new mongo('categories');

async function start(){
    await products.dropIndexes();
    await products.index({tags: "text", name: "text"});
    await products.index({url: 1}, {unique: true});
    await categories.dropIndexes();
    await categories.index({name: "text"});
    await categories.index({url: 1}, {unique: true});
}

start()