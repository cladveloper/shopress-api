require('dotenv').config({path: __dirname + '/.env'})

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    defaultAdminUser: process.env.DEFAULT_ADMIN_USER,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
    maxResultsPerPage: process.env.MAX_RESULTS_PER_PAGE,
    productionRoute: process.env.PRODUCTION_ROUTE,
}

module.exports = {config};