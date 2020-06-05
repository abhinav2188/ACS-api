const router = require("express").Router();
const Service = require("../model/Service");
const db = require("../config/db");


//@desc fetch all products with serviceName
router.get("/:serviceName/all", (req, res) => {
  Service.findOne({name:req.params.serviceName}, (err, result) => {
    if (err) res.status(400).json({ success: false, error: err.message });
    else
      res.status(200).json({
        success: true,
        data:result.products
      });
  });
});

//@desc route to add product to a service
router.put("/:serviceName", db.upload.single("productImage"), (req, res) => {
  const body = req.body;
  const serviceName = req.params.serviceName;
  const newProduct ={
    name: body.productName,
    ISN: body.productISN,
    productImageUrl: req.file ? req.file.filename : "",
  };
  Service.findOne({ name: serviceName }, (err, service) => {
    if (err) res.status(400).json({ success: false, error: err.message });
    if (!service)
      res.status(404).json({ success: false, error: "service not found" });
    service.products.push(newProduct);
    service.save((err) => {
      if (!err) res.status(200).json({ success: true, updated: service });
      else res.status(400).json({ success: false, error: err.message });
    });
  });
});

//@desc delete a product
router.delete("/:serviceName/:productID", (req, res) => {
  const serviceName = req.params.serviceName;
  const productID = req.params.productID;
  Service.findOne({ name: serviceName }, (err, service) => {
    if (err) res.status(400).json({ msg: err.message });
    if (!service) res.status(404).json({ msg: "service not found" });
    service.products = service.products.filter((p) => p._id != productID);
    service.save((err) => {
      if (!err) res.status(200).json({ success: true, updated: service });
      else res.status(400).json({ success: false, error: err.message });
    });
  });
});

module.exports = router;