const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public/"));
app.set("view engine", "ejs");
// middleware to log all requests
app.use(require("./middleware/logger"));

app.use('/api',require("./routes/auth"));
app.use('/api/service',require("./routes/service"));
app.use('/api/file',require('./routes/files'));
app.use('/api/products',require('./routes/product'));
app.use('/api/testimonial',require('./routes/testimonial'));
app.use('/api/testimonial',require('./routes/testimonial'));
app.use('/api/client',require('./routes/client'));

const filesCleanup = require('./middleware/filesCleanup');
app.delete('/api/filesCleanup' ,async (req,res) => {
  res.send(await filesCleanup());
})

//@route /
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3001, console.log("server started at port 3001"));
