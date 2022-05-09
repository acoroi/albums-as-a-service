/* Module for setting app level config variables */

// Function to validate an expected ENV variable
const validateEnvironmentVariable = (environmentVariable, environmentVariableString) => {
     if (!environmentVariable) throw new Error(`${environmentVariableString} is a required environment variable with no default value and was not supplied.`)
     return environmentVariable;
};

// Required configuration (server)
const port = validateEnvironmentVariable(process.env.PORT, 'process.env.PORT');
const host = validateEnvironmentVariable(process.env.HOST, 'process.env.HOST');

// Optional configuration (server)
const serverStopTimeout = parseInt(process.env.SERVER_STOP_TIMEOUT_MS || 30 * 1000);

// Required configuration (db)
const dbUrl = validateEnvironmentVariable(process.env.MONGO_URL, 'process.env.MONGO_URL');
const dbName = validateEnvironmentVariable(process.env.MONGO_DB_NAME, 'process.env.MONGO_DB_NAME');

// Optional configuration (db)
const dbNumRetries = process.env.MONGO_NUM_RETRIES || 5; // Number of times Mongo will attempt to establish a connection before giving up
const dbRetryMs = process.env.MONGO_RETRY_MS || 1000; // Amount of time in MS between connection attempts

// Optional configuration (logger)
const loggerLevel = process.env.LOGGER_LEVEL || 'debug';
const loggerFormat = process.env.LOGGER_FORMAT || 'json';

module.exports = {
    serverStopTimeout,
    host,
    port,
    dbUrl,
    dbNumRetries,
    dbRetryMs,
    dbName,
    loggerLevel,
    loggerFormat,
};
