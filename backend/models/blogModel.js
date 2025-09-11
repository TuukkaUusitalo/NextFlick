const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  movie: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);