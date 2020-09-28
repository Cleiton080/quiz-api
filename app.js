const express = require("express");
const app = express();

app.use(express.json());

// Routes
app.use("/", require("./routes/index"));

module.exports = app;
