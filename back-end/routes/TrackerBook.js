const express = require("express");
const router = express.Router();
const TrackerBook = require("../models/TrackerBook");
const Book = require("../models/Book");
const User = require("../models/User");
const Question = require("../models/Question");
const mongoose = require("mongoose");

router.get("/:userId/:bookId", async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const trackerBook = await TrackerBook.findOne({ userId, bookId }).populate(
      "quizTrack.question",
      "selectedAnswer correctAnswer"
    ); 

    if (!trackerBook) {
      return res.status(404).json({ message: "TrackerBook not found" });
    }

    res.status(200).json(trackerBook);
  } catch (error) {
    console.error("Error fetching tracker book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("", async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    let tracker = await TrackerBook.findOne({ userId, bookId });

    if (!tracker) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      const questions = await Question.find({ bookId });
      const quizTrack = questions.map((question) => ({
        question: question._id,
        selectedAnswer: null,
      }));
      const newTracker = new TrackerBook({
        userId,
        bookId,
        currentPage: 1,
        bookPageCount: book.bookPageCount,
        quizTrack,
      });
      await newTracker.save();
      return res.status(201).json({ currentPage: 1, quizTrack });
    }
    res
      .status(200)
      .json({ currentPage: tracker.currentPage, quizTrack: tracker.quizTrack });
  } catch (error) {
    console.error(error);
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

router.put("/update-quiz", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.body.userId);
    const bookId = new mongoose.Types.ObjectId(req.body.bookId);
    const questionId = req.body.quizId;
    const { selectedAnswer } = req.body;
    const trackerBook = await TrackerBook.findOne({
      userId: userId,
      bookId: bookId,
    });
    if (!trackerBook) {
      return res.status(404).json({ message: "TrackerBook not found" });
    }
    const quizTrack = trackerBook.quizTrack.find(
      (track) => track.question.toString() === questionId
    );
    if (!quizTrack) {
      return res
        .status(404)
        .json({ message: "Question not found in quizTrack" });
    }
    quizTrack.selectedAnswer = selectedAnswer;
    await trackerBook.save();
    return res
      .status(200)
      .json({ message: "Selected answer updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
