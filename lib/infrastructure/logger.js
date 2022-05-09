/* An extension of Winston for some simple logging. */
const {createLogger, format, transports} = require('winston');

let logger;

const configure = configuration => {
    // Pass in a configuration to create a logger
    if (!logger) {
        logger = createLogger({
            // These are sourced from config i.e. from the environment
            level: configuration.level,
            // Default to simple if the config doesn't tell us to use json
            format: configuration.format === 'json' ? format.json() : format.simple(),
            transports: [
                // OK with dumping to console for now
                new transports.Console(),
                /*
                    If you are deploying this app anywhere (i.e. not just running locally), then you would
                    want to add transports here to account for where you want to log
                 */
            ]
        });
    }
};

const info = message => { if (logger) logger.info(message) };

const error = message => { if (logger) logger.error(message) };

module.exports = {
    configure,
    info,
    error,
};
