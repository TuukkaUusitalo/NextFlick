const connectDB = require("./config/db");
const express = require("express");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const movieRouter = require("./routes/movieRouter");
const imageRouter = require("./routes/imageRouter");
const {requestLogger,unknownEndpoint,errorHandler} = require("./middleware/customMiddleware");
require("dotenv").config();
const cors = require('cors');


// express app
const app = express();

connectDB();
app.use(cors());

// middleware
app.use(express.json());
app.use(express.static('view'));
app.use(requestLogger);

// routes

app.use("/api/movies", movieRouter);
// Use the userRouter for all /users routes¨
app.use("/api/users", userRouter);
// Use the reviewRouter for all /review routes
app.use("/api/reviews", reviewRouter);

app.use("/api/image", imageRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

// const port = process.env.PORT || 4000;
// app.listen(port, () =>
//   console.log(`Server is running on http://localhost:${port}`)
// );

module.exports = app;