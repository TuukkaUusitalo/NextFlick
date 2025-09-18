const connectDB = require("./config/db");
const express = require("express");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const movieRouter = require("./routes/movieRouter");
const {requestLogger,unknownEndpoint,errorHandler} = require("./middleware/customMiddleware");
require("dotenv").config();
 
// express app
const app = express();

connectDB();
 
// middleware
app.use(express.json());

app.use(requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

// routes

app.use("/api/movies", movieRouter);
// Use the userRouter for all /users routes¨
app.use("/api/users", userRouter);
// Use the blogRouter for all /cars routes
app.use("/api/blogs", blogRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
