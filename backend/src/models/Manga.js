const mongoose = require('mongoose');

const Manga = mongoose.model('Manga', {
  name: String,
  image_url: String,
  price: Number,
});

module.exports = Manga;
