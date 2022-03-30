const express = require("express");
const app = express();

//Rotas
const index = require("./routes/index");
app.use("/", index);

module.exports = app;