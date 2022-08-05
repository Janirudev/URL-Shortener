const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.get('/', (req, res) => {
  res.json({ msg: 'Welcome to Spritzee Server 🎂, A link shortener project.' });
});

router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    let url = await Url.findOne({ shortUrl });
    if (url) {
      res.json(url);
    } else {
      res.status(404).json({ msg: 'No url found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

router.get('/r/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    let url = await Url.findOne({ shortUrl });
    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).json({ msg: 'No url found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

module.exports = router;
