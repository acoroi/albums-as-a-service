/* Module for interacting with Mongo */

const { MongoClient } = require('mongodb');
const { info, error } = require('./logger');

// Utility module
const { generateId } = require('../utility');

let mongoClient;
let db;

const initialize = async configuration => {
    if (!mongoClient) {
        // Need to initialize mongo client if it doesn't exist
        mongoClient = new MongoClient(url = configuration.dbUrl);

        // Attempt to connect
        await mongoClient.connect();

        // Did we connect?
        info({
            message: 'Successfully connected to local MongoDB instance',
            configuration,
        });

        // DB
        db = mongoClient.db(configuration.dbName);
    }
};

const insert = async record => {
    if (!mongoClient || !db) throw new Error('Please initialize the MongoDB client before attempting to query');

    try {
        const collection = db.collection('Albums');

        // Record
        const document = {
            title: record.title,
            id: generateId(),
            artist: record.artist,
            genre: record.genre,
            releaseYear: record.releaseYear,
            features: record.features,
            tracklist: record.tracklist,
        };
    
        // Insert
        const result = await collection.insertOne(document);
    
        info({
            message: 'Successfully inserted record',
            id: result.insertedId,
        });

        return result.insertedId;
    } catch (err) {
        error({
            message: 'An error occurred when attempting to insert a new Album record',
            err: err.message,
        });
        throw err;
    }
};

const getOne = async params => {
    if (!mongoClient || !db) throw new Error('Please initialize the MongoDB client before attempting to query');

    try {
        const collection = db.collection('Albums');

        const options = {
            // Let's only bring back a few identifying parameters.. caller can make a FULL GET request if they want more
            projection: { _id: 0, title: 1, artist: 1, genre: 1, releaseYear: 1 },
        };

        // Search and format
        const results = await collection.find(params, options).toArray();

        // Return
        return results;
    } catch (err) {
        error({
            message: 'An error occurred when attempting to get a single record by its id',
            err: err.message,
        });
        throw err;
    }
};

const getMultiple = async params => {
    if (!mongoClient || !db) throw new Error('Please initialize the MongoDB client before attempting to query');

    try {
        const collection = db.collection('Albums');

        const query = {};

        if (params) {
            // Caller passed along some qs param(s) - populate our query :)
            if (params.genre) query.genre = params.genre;
            if (params.artist) query.artist = params.artist;
            if (params.releaseYear) query.releaseYear = params.releaseYear;
        }

        const options = {
            // Let's only bring back a few identifying parameters.. caller can make a FULL GET request if they want more
            projection: { _id: 0, title: 1, artist: 1, genre: 1, releaseYear: 1 },
        };

        // Search and format
        const results = await collection.find(query, options).toArray();

        // Format and return
        return results;
    } catch (err) {
        error({
            message: 'An error occurred when attempting to get multiple records',
            err: err.message,
        });
        throw err;
    }
};

const close = () => {
    // Close connection
    if (mongoClient) mongoClient.close();
    info({ message: 'Successfully closed MongoDB connection' });
};

module.exports = {
    initialize,
    insert,
    getOne,
    getMultiple,
    close,
};
