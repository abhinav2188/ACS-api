const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public/"));
app.set("view engine", "ejs");
const dotenv = require('dotenv');
dotenv.config();

// middleware to log all requests
const logger = (req, res, next) => {
  console.log("logger @route", req.method ,req.url);
  next();
};
app.use(logger);

const db = require("./config/db");

const authRoute = require('./routes/auth');
app.use('/api/admin', authRoute);
app.use('/api/service',require("./routes/service"));
app.use('/api/file',require('./routes/files'));
app.use('/api/products',require('./routes/product'));

//@route /
app.get("/", (req, res) => {
  res.render("home");
});


app.listen(3000, console.log("server started at port 3000"));
