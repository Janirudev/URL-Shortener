const Joi = require('joi');

const urlSchema = Joi.object({
  shortUrl: Joi.string().min(2).max(32).required(),
  longUrl: Joi.string()
    .min(9)
    .uri({ scheme: ['http', 'https'] })
    .required(),
}).with('shortUrl', 'longUrl');

module.exports = urlSchema;
