const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user")
const bookRoutes = require("./routes/book")
const questionRoutes = require("./routes/question")
const trackerBookRoutes = require("./routes/TrackerBook")
const animationRoutes = require("./routes/animation")
const otpRoutes = require("./routes/otp")

const app = express();
mongoose.connect("mongodb+srv://BabyUniversity:BabyUniversity123@cluster0.kqoqi.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Connect to database"))
.catch((err)=>console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/books", bookRoutes)
app.use("/api/v1/questions", questionRoutes)
app.use("/api/v1/tracker-books", trackerBookRoutes)
app.use("/api/v1/animations", animationRoutes)
app.use("/api/v1/otp", otpRoutes)

module.exports = app