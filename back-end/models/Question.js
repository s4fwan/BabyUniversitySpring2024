const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
  selectedAnswer:{
    type: Number,
    required: false,
  },
  sound: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Question', QuestionSchema);
