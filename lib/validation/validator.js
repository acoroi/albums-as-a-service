const Joi = require('joi');

// Regex for year
const yearRegex = /^[1,2]{1}[\d]{3}$/;

const qsValidation = Joi.object({
    genre: Joi.string().alphanum().min(1),
    artist: Joi.string().alphanum().min(1),
    releaseYear: Joi.string().regex(yearRegex),
});

/*
    TODO: Strict validation on the payload that is being submitted by the caller.
*/

module.exports = {
    // Validation for QS params
    qsValidation
};
