var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');

var packagesRouter = require("./routes/packages");

var app = express();
app.use(cors({
  origin: [
    'http://localhost:4200',
  ],
  credentials: true,
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/packages", packagesRouter);

module.exports = app;
