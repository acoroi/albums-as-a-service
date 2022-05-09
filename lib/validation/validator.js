const Joi = require('joi');

// Regex for year
const yearRegex = /^[1,2]{1}[\d]{3}$/;

const qsValidation = Joi.object({
    genre: Joi.string().alphanum().min(1),
    artist: Joi.string().alphanum().min(1),
    releaseYear: Joi.string().regex(yearRegex),
});

const createAlbumValidation = Joi.object({
    title: Joi.string().alphanum().min(1).required(),
    artist: Joi.string().alphanum().min(1).required(),
    genre: Joi.string().alphanum().min(1).required(),
    releaseYear: Joi.string().regex(yearRegex),
});

module.exports = {
    // Validation for QS params
    qsValidation,
    // Validation for POST album
};
