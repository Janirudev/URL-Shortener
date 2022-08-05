const express = require('express');
const router = express.Router();
const urlSchema = require('../validation/urlValidation');
const { nanoid } = require('nanoid');

const IDSIZE = process.env.MAXIDSIZE || 8;
const KEY = process.env.ACCESS_TOKEN || '$$ABC123';

const Url = require('../models/Url');

// @route         POST  /api/url/shorten
// @description   Create short Url
router.post('/shorten', async (req, res) => {
  let { shortUrl, longUrl } = req.body;
  let { auth } = req.headers;
  let value;

  if (auth !== KEY) {
    res.status(401);
    res.json({ msg: 'Unauthenticated' });
    return;
  }

  // todo: Validation of shortUrl and longUrl, shortUrl is optional
  // todo: Validation is longUrl is a valid url
  // todo Validation check if shortUrl points to itself
  if (!shortUrl) {
    shortUrl = nanoid(IDSIZE);
  }

  try {
    value = await urlSchema.validateAsync({
      shortUrl,
      longUrl,
    });
  } catch (err) {
    console.error(err);
    err.msg = err.details[0].message;
    err.status = 422;
    res.json(err);
    next(err);
  }

  try {
    let url = await Url.findOne({ shortUrl });

    if (url) {
      return res.json(url);
    }

    url = new Url(value);

    await url.save();

    return res.json(url);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
