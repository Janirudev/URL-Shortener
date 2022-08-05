const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      max: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Url', urlSchema);
