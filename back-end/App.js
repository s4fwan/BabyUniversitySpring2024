const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user")
const bookRoutes = require("./routes/book")
const questionRoutes = require("./routes/question")
const trackerBookRoutes = require("./routes/TrackerBook")
//gwuh qxfx qkyd wwel

const app = express();
mongoose.connect("mongodb+srv://BabyUniversity:BabyUniversity123@cluster0.kqoqi.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Connect to database"))
.catch((err)=>console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/api/users",userRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/questions", questionRoutes)
app.use("/api/tracker-books", trackerBookRoutes)

module.exports = app