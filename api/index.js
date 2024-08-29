require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const registerRoutes = require("../routes/register.js");
const loginRoutes = require("../routes/login.js");
const notesRoutes = require("../routes/notes.js");
const authRoutes = require("../routes/auth.js");
const app = express();
const port = process.env.PORT || 3000;

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err.parent && err.parent.errno === 1451) {
    res.status(400).json({ error: err.parent.sqlMessage });
  } else if (err.errors && err.errors[0]) {
    res.status(400).json({ error: err.errors[0].message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCorsOrigin = () => {
  const origin = process.env.FRONTEND_ORIGIN;
  if (origin === undefined || origin === "") {
    // Default to localhost if FRONTEND_ORIGIN is undefined or empty
    return "http://localhost:5173";
  }
  return origin;
};

app.use(
  cors({
    origin: getCorsOrigin(),
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

app.all("*", (req, res) => res.send("This route does not exist."));

app.use(errorHandler);

if (process.env.NODE_ENV === "development") {
  // Only run this locally
  app.listen(port, () => {
    console.log(`Local server listening on port ${port}`);
  });
}

module.exports = app;