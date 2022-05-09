// A module that wraps Hapi to create a base application
const hapi = require('@hapi/hapi');
const logger = require('./logger');

// Route handlers
const { getAlbumById, getAlbums, addAlbum } = require('../handlers/music-handlers');

// Config
const { serverStopTimeout } = require('../config');
const { albumsValidation } = require('../validation/validator');

let server;

const start = async configuration => {
    // Function to start up a Hapi server :)

    // Instantiate a server instance if one doesn't exist
    if (!server) server = hapi.server(configuration);

    await server.start();

    logger.info({
        message: 'Web Server started',
        configuration,
    });
};

const stop = async () => {
    // Function to stop a Hapi server :)
    logger.error({
        message: 'Stopping the Hapi server... waiting before complete shutdown',
        serverStopTimeout,
    });

    if (server) server.stop({ timeout: serverStopTimeout }).then(() => {
        logger.info({
            message: 'Shutdown complete'
        })
    });
};

const setRoutes = () => {
    // Function to establish the routes for the application
    if (server) {
        server.route([
            {
                method: 'GET',
                path: '/hello',
                handler: () => {
                    return { message: 'Ahh, hello. Was it you who rang the bell of awakening?' }
                },
            },
            {
                method: 'GET',
                path: '/albums/{id}',
                handler: getAlbumById,
            },
            {
                method: 'GET',
                path: '/albums',
                handler: getAlbums,
                options: {
                    validate: {
                        query: albumsValidation,
                    },
                },
                // Add qs params here for: artist, release year, genre
            },
            {
                method: 'POST',
                path: '/albums',
                handler: addAlbum,
            }
        ]);
    }
};

module.exports = {
    start,
    stop,
    setRoutes,
};
