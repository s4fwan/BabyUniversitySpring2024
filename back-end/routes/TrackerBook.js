const express = require("express");
const router = express.Router();
const TrackerBook = require("../models/TrackerBook");
const Book = require("../models/Book");
const User = require("../models/User");
const mongoose = require("mongoose");

router.get("/current-page/:userId/:bookId", async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const tracker = await TrackerBook.findOne({ userId, bookId });
    if (!tracker) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      const newTracker = new TrackerBook({
        userId,
        bookId,
        currentPage: 1,
        bookPageCount: book.bookPageCount,
      });
      await newTracker.save();
      res.status(201).json({ currentPage: 1 });
      return;
    }
    res.status(200).json({ currentPage: tracker.currentPage });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/update-current-page", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.userId);
  const bookId = new mongoose.Types.ObjectId(req.body.bookId);
  const { currentPage } = req.body;
  try {
    const tracker = await TrackerBook.findOne({ userId, bookId });
    if (!tracker) {
      return res.status(404).json({ message: "Tracker entry not found" });
    }
    tracker.currentPage = currentPage;
    await tracker.save();
    res.status(200).json({ message: "Current page updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/start-tracking", async (req, res) => {
//   const { userId, bookId } = req.body;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     const existingTracking = await TrackerBook.findOne({ userId, bookId });
//     if (existingTracking) {
//       return res
//         .status(400)
//         .json({ message: "Tracking for this book already exists" });
//     }
//     const tracker = new TrackerBook({
//       userId,
//       bookId,
//       currentPage: 1,
//       bookPageCount: book.bookPageCount,
//     });
//     await tracker.save();
//     res.status(201).json({ message: "Tracking started successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
