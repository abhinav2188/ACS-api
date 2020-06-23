const router = require("express").Router();
const Service = require("../model/Service");
const db = require("../config/db");
const authorizeRequest = require("../middleware/authorize");

//@desc fetch all services
router.get("/all", (req, res) => {
  Service.find({},{name:1,headline:1,serviceLogo:1}, (err, result) => {
    if (err) res.status(400).json({ msg: "error fetching services" });
    else
      res.status(200).json(result);
  });
});

//@desc add new service
router.post("/", authorizeRequest ,db.upload.single("serviceLogo"), (req, res) => {
  const data = req.body;
  const newService = new Service({
    name: data.serviceName,
    headline: data.serviceHeadline,
    serviceLogo: req.file ? req.file.filename : "",
  });
  newService.save((err) => {
    if (!err) res.status(201).json("created servcie "+newService.name);
    else res.status(400).json(err.message);
  });
});

//@desc retrieve a service with its name
router.get("/:serviceName", (req, res) => {
  Service.findOne({ name: req.params.serviceName },{products:0}, (err, result) => {
    if (err) res.status(400).json(err.message );
    else {
      if (!result)
        res.status(404).json("service not found");
      else {
        res.status(200).json(result);
      }
    }
  });
});

//@desc delete a service with its id
router.delete("/:id",authorizeRequest, (req, res) => {
  console.log("here");
  console.log("delete",req.params.id);
  Service.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) res.status(400).json(err.message );
    else {
      if (!result)
        res.status(404).json("service not found");
      else {
        res.status(200).json("service deleted "+result.name);
      }
    }
  });
});

// @desc updata a service data
router.patch("/:serviceName",authorizeRequest, db.upload.single("serviceLogo"), (req, res) => {
  Service.findOne({ name: req.params.serviceName }, (err, service) => {
    if (err) res.status(400).json(err.message);
    else {
      if (!service)
        res.status(404).json("service not found");
      else {
        if (req.body.serviceName) service.name = req.body.serviceName;
        if (req.body.serviceHeadline)
          service.headline = req.body.serviceHeadline;
        if (req.file) service.serviceLogo = req.file.filename;
        service.save((err) => {
          if (!err) res.status(200).json(service);
          else res.status(400).json(err.message);
        });
      }
    }
  });
});

module.exports = router;
