const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors, celebrate } = require("celebrate");
const winston = require("winston");
const expressWinston = require("express-winston");
require("dotenv").config();

const auth = require("./middlewares/auth");
const { createUser, login } = require("./controllers/user");
const { signupSchema, signinSchema } = require("./validation/schemas");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/aroundb");

// Enable CORS
app.use(cors());
app.options("*", cors());

// Parse JSON requests
app.use(express.json());

// Request logger
app.use(
  expressWinston.logger({
    transports: [new winston.transports.File({ filename: "request.log" })],
    format: winston.format.json(),
  })
);

// Crash test route for testing server recovery with PM2
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

// Public routes (no authentication required)
app.post("/signin", celebrate(signinSchema), login);
app.post("/signup", celebrate(signupSchema), createUser);

// Apply authentication middleware to all routes below
app.use(auth);

// Import protected routes
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

// Use protected routes
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Middleware for non-existent routes
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

// Error logger
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.File({ filename: "error.log" })],
    format: winston.format.json(),
  })
);

// Celebrate validation error handler
app.use(errors());

// Centralized error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message:
      statusCode === 500 ? "An error has occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
