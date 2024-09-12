const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add-book', async (req, res) => {
  const { name, author, bookPageCount } = req.body;
  try {
    const existingBook = await Book.findOne({name,author});
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists. No need to add.' });
    }
    const newBook = new Book({
      name,
      author,
      bookPageCount
    });
    await newBook.save();
    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update-book', async (req, res) => {
  const {bookId, name, author, bookPageCount } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { name, author, bookPageCount },
      { runValidators: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
