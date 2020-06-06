const router = require("express").Router();
const Service = require("../model/Service");
const db = require("../config/db");
const authorizeRequest = require("../middleware/authorize");

//@desc fetch all services
router.get("/all", (req, res) => {
  Service.find({}, (err, result) => {
    if (err) res.status(400).json({ msg: "error fetching services" });
    else
      res.status(200).json({
        success: true,
        data: result,
      });
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
    if (!err) res.status(200).json({ success: true, created: newService });
    else res.status(400).json({ success: false, error: err.message });
  });
});

//@desc retrieve a service with its name
router.get("/:serviceName", (req, res) => {
  Service.findOne({ name: req.params.serviceName }, (err, result) => {
    if (err) res.status(400).json({ success: false, error: err.message });
    else {
      if (!result)
        res.status(404).json({ success: false, error: "service not found" });
      else {
        res.status(200).json({
          success: true,
          data: result,
        });
      }
    }
  });
});

//@desc delete a service with its name
router.delete("/:serviceName",authorizeRequest, (req, res) => {
  Service.findOneAndDelete({ name: req.params.serviceName }, (err, result) => {
    if (err) res.status(400).json({ success: false, error: err.message });
    else {
      if (!result)
        res.status(404).json({ success: false, error: "service not found" });
      else {
        res.status(200).json({
          success: true,
          deleted: result,
        });
      }
    }
  });
});

// @desc updata a service data
router.patch("/:serviceName",authorizeRequest, db.upload.single("serviceLogo"), (req, res) => {
  Service.findOne({ name: req.params.serviceName }, (err, service) => {
    if (err) res.status(400).json({ success: false, error: err.message });
    else {
      if (!service)
        res.status(404).json({ success: false, error: "service not found" });
      else {
        if (req.body.serviceName) service.name = req.body.serviceName;
        if (req.body.serviceHeadline)
          service.headline = req.body.serviceHeadline;
        if (req.file) service.serviceLogo = req.file.filename;
        service.save((err) => {
          if (!err) res.status(200).json({ success: true, updated: service });
          else res.status(400).json({ success: false, error: err.message });
        });
      }
    }
  });
});

module.exports = router;
