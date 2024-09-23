const mongoose = require('mongoose');

const TrackerBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  currentPage: {
    type: Number,
    required: true,
  },
  bookPageCount: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('TrackerBook', TrackerBookSchema);
