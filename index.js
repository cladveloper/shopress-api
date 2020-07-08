// Package
const express = require('express');
const app = express();
const cors = require('cors');
// Imports
const {config} = require('./config');
const routes = require('./app/routes');
const {logError, wrapError, errorHandler} = require('./utils/middlewares/errorHandler');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// cors
if(config.dev){
    app.use(cors());
} else{
    const whitelist = config.cors.split(';');
    const corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    };
    app.use(cors(corsOptions));
}

// Body-Parser
app.use(express.json());

// Static
app.use(express.static('public'));

routes(app);

// Catch 404
app.use(notFoundHandler);

// Catch Errors
app.use(logError);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
    console.log(config.dev ? 'Entorno: desarrollo' : 'Entorno: producción');
})