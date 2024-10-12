const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  animation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animation",
    required: true,
  },
});

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  bookPageCount: {
    type: Number,
    required: true,
  },
  pages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Animation', 
      required: true,
    }
  ],
});

module.exports = mongoose.model("Book", BookSchema);
