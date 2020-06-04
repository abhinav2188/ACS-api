const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public/'));
app.set('view engine', 'ejs');

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// middleware to log all requests
const logger = (req,res,next) => {
    console.log("logger route",req.url);
    next();
}
app.use(logger);

const mongoURI = 'mongodb://localhost/ACS';
const mongoose = require('mongoose');

//connecting to database
mongoose.connect(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const conn = mongoose.connection;

//gridfs setup
let gfs;
conn.once('open', () =>{
  gfs= Grid(conn.db,mongoose.mongo);
  gfs.collection('images');
})

//gridfs storage component
var storage = new GridFsStorage({
  url: mongoURI,
  options: {useUnifiedTopology: true},
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

//@schema Product
const ProductSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  ISN:{
    type:String,
    required:true
  }
})

//@schema Service
const ServiceSchema = mongoose.Schema({
    name:{
      type:String,
      required:true,
      index:true,
      unique:true,
    },
    headline:{
      type:String,
      trim:true,
      required:true
    },
    serviceLogo : {
      type:String
    },
    products:[ProductSchema]
})

const Service = mongoose.model('service',ServiceSchema);



//@route /
app.get('/', (req,res) => res.render('home') );

//@route POST /service 
//@desc add new service
app.post('/service', upload.single("serviceLogo"),(req,res) => {
  // res.json({body:req.body,file:req.file});
  const data = req.body;
  const newService = new Service({
    name:data.name,
    headline:data.headline,
    serviceLogo:req.file.filename
  });
  newService.save(err => {
    if(!err)
    res.status(200).json({msg:"new service added"});
    else
    res.status(400).json({msg:err.message})
  });
});

//@route GET /services
//@desc to get all services
app.get('/services', (req,res) => {
  Service.find({},(err,result)=>{
    if(err)
    res.status(400).json({msg:"error fetching services"});
    else
    res.status(200).json({
      msg:"services fetched",
      data:result
    });
  })
})


app.listen(3000,console.log("server started at port 3000"));