/* A simple node app that does some fun stuff regarding music */

// Module for loading env file
require('dotenv').config();

// Module for logging
const logger = require('./lib/infrastructure/logger');

// Module for app base methods and routes
const { start, stop, setRoutes } = require('./lib/infrastructure/base');

// Module for db interaction
const { initialize, close } = require('./lib/infrastructure/db');

// Module for app configuration (base, db, etc)
const {
    port,
    host,
    dbUrl,
    dbNumRetries,
    dbRetryMs,
    dbName,
    loggerLevel,
    loggerFormat,
} = require('./lib/config');

// Set up logger
logger.configure({ level: loggerLevel, format: loggerFormat }); // Now we can use it...

// Ensure we don't try to unsafely shutdown again once the server is in a stopping pattern
let isStopping = false;

// Listeners for SIGINT and SIGTERM to indicate when the server should stop
process.on('SIGINT', async () => {
    logger.info({ message: 'SIGINT received - terminating the web server' });

    if (!isStopping) {
        // Execute hapi server stop
        isStopping = true;
        await stop();

        // Close MongoDB connection
        close();
    }
});

process.on('SIGTERM', async () => {
    logger.info({ message: 'SIGTERM received - terminating the web server' });

    if (!isStopping) {
        // Execute hapi server stop
        isStopping = true;
        await stop();

        // Close MongoDB connection
        close();
    }
});

start({ port, host })
    .then(async () => {
        // Establish app routes
        setRoutes();
        logger.info({ message: 'Successfully established the web service routes', });

        // Establish db connection
        await initialize({ dbUrl, dbNumRetries, dbRetryMs, dbName });

        // Runs upon successful completion of the start() promise
        logger.info({ message: 'Successfully started the web server', });
    })
    .catch(err => {
        // Encountered an issue with startup
        logger.error({
            message: 'An error occurred upon startup of the web server',
            err,
        });

        // Exit our application with a non-zero exit code
        process.exit(1);
    });
