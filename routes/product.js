const router = require("express").Router();
const Service = require("../model/Service");
const db = require("../config/db");
const authorizeRequest = require("../middleware/authorize");
const Product = require("../model/Product");

//@desc get all products
router.get("/all", (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.status(400).json(err.message);
    else res.status(200).json(products);
  });
});

//@desc fetch all products with service id
router.get("/:id", (req, res) => {
  Product.find({ service: req.params.id }, (err, products) => {
    if (err) res.status(400).json(err.message);
    else res.status(200).json(products);
  });
});

//@desc route to add product to a service
router.post(
  "/",
  authorizeRequest,
  db.upload.single("productImage"),
  (req, res) => {
    const body = req.body;
    const newProduct = new Product({
      name: body.productName,
      ISN: body.productISN,
      productImageUrl: req.file ? req.file.filename : "",
      DOI: body.dateOfImplementation,
      onDisplay: body.onDisplay,
      service: body.serviceId,
    });
    newProduct.save((err) => {
      if (!err) res.status(201).json("created product : "+newProduct.name);
      else res.status(400).json(err.message);
    });
  }
);

//@desc delete a product
router.delete("/:id", authorizeRequest, (req, res) => {
  const id = req.params.id;
  Product.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) res.status(400).json(err.message);
    else {
      if (!result) res.status(404).json("product not found");
      else res.status(200).json("product deleted " + result.name);
    }
  });
});

// @desc updata a product data
router.patch(
  "/:id",
  authorizeRequest,
  db.upload.single("productImage"),
  (req, res) => {
    Product.findOne({ _id: req.params.id }, (err, product) => {
      if (err) res.status(400).json(err.message);
      else {
        if (!product)
          res.status(404).json("product not found");
        else {
          if (req.body.productName) product.name = req.body.productName;
          if (req.body.productISN) product.ISN = req.body.productISN;
          if (req.file) product.productImageUrl = req.file.filename;
          if (req.body.dateOfImplementation)
            product.DOI = req.body.dateOfImplementation;
          if (req.body.onDisplay) product.onDisplay = req.body.onDisplay;
          product.save((err) => {
            if (!err) res.status(200).json("updated product "+product.name);
            else res.status(400).json(err.message);
          });
        }
      }
    });
  }
);

module.exports = router;
