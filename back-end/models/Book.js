const mongoose = require("mongoose");

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
      animation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animation",
        required: true,
      },
      sound: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("Book", BookSchema);
