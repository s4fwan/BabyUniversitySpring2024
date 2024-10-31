const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Question = require('../models/Question'); 

router.get('/:bookId', async (req, res) => {
  const bookId = new mongoose.Types.ObjectId(req.params.bookId);
  try {
    const questions = await Question.aggregate([
      { $match: { bookId: bookId } }, 
      { $sample: { size: 5 } } 
    ]);
    if (!questions.length) {
      return res.status(404).json({ message: 'No questions found for this book' });
    }    
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update-selected-answer', async (req, res) => {
  const { questionId, selectedAnswer } = req.body;

});

module.exports = router;
