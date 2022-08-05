const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

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

module.exports = router;
