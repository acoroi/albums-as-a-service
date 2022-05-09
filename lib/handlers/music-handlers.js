// Module for logging
const logger = require('../infrastructure/logger');

// Module for db interaction
const { insert, getMultiple, getOne } = require('../infrastructure/db');

const getAlbumById = async (req, h) => {
    let album;
    let results;
    try {
        logger.info({
            message: 'Received getAlbum request',
            param: req.params,
        });

        results = await getOne(req.params);

        if (results && results.length === 0) {
            // Got a response but there were no records
            results = {
                message: 'No record found for the specified id',
                id: req.params.id,
            };
            return h.response(results).code(404);
        }

        return h.response(results.pop()).code(200);
    } catch (err) {
        logger.error({
            message: 'An internal error occurred when trying to retrieve Album details',
            err: err.message,
        });
        return h.response(album).code(500);
    }
};

const getAlbums = async (req, h) => {
    let albums;
    let results;
    try {
        logger.info({
            message: 'Received getAlbums request',
            query: req.query,
        });

        results = await getMultiple(req.query);

        if (results && results.length === 0) {
            // Got a response but there were no records
            results = {
                message: 'No record(s) found for the given parameters',
                qs: req.query,
            };
            return h.response(results).code(404);
        }

        return h.response(results).code(200);
    } catch (err) {
        logger.error({
            message: 'An internal error occurred when trying to retrieve Albums',
            err: err.message,
        });
        return h.response(albums).code(500);
    }
};

const addAlbum = async (req, h) => {
    try {
        logger.info({
            message: 'Received addAlbum request',
            param: req.params,
            payload: req.payload,
        });

        await insert(req.payload);

        const response = {
            message: 'Successfully created new Album entry',
        };

        return h.response(response).code(200);
    } catch (err) {
        logger.error({
            message: 'An error occurred when trying to add an Album',
            err: err.message,
        });
    }
};

module.exports = {
    getAlbumById,
    getAlbums,
    addAlbum,
};