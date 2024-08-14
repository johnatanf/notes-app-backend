const express = require("express");
const cookieParser = require("cookie-parser");
const registerRoutes = require("./routes/register.js");
const loginRoutes = require("./routes/login.js");
const notesRoutes = require("./routes/notes.js");
const app = express();
const port = 3000;

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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/notes", notesRoutes);

app.all("*", (req, res) => res.send("This route does not exist."));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`starting http://localhost:${port}`);
});
