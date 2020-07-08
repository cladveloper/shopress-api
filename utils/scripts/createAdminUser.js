// set DEBUG=app:* & node utils/scripts/createAdminUser.js
const bcrypt = require('bcrypt');

const mongo = require('../../lib/mongo');
const user = new mongo('user');
const {config} = require('../../config');
const saltRounds = 10;

const {defaultAdminUser} = config;
const {defaultAdminPassword} = config;

bcrypt.hash(defaultAdminPassword, saltRounds)
.then((hash) => {
    user.update(
        {_id: '__admin__shopress__'}, 
        {$set: {
            username: defaultAdminUser,
            password: hash
        }}, 
        false, {
            upsert: true,
        }
    )
    .then(()=> console.log('Administrador creado'))
    .catch(() => console.log('No se pudo crear el administrador'));
})
.catch(() => console.log('No se pudo crear el administrador'));
