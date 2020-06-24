const router = require("express").Router();
const Client = require("../model/Client");
const db = require("../config/db");
const authorizeRequest = require("../middleware/authorize");

//@desc fetch all clients
router.get("/all", (req, res) => {
  Client.find({}, (err, result) => {
    if (err) res.status(400).json("error fetching clients");
    else res.status(200).json(result);
  });
});

//@desc add new client
router.post(
  "/",
  authorizeRequest,
  db.upload.single("clientLogo"),
  (req, res) => {
    const data = req.body;
    const newClient = new Client({
      name: data.clientName,
      logoUrl: req.file ? req.file.filename : "",
    });
    newClient.save((err) => {
      if (!err) res.status(201).json("created client : "+newClient.name);
      else res.status(400).json(err.message);
    });
  }
);

//@desc retrieve a client with its id
router.get("/:id", (req, res) => {
  Client.findOne({ _id: req.params.id }, (err, result) => {
    if (err) res.status(400).json(err.message);
    else {
      if (!result) res.status(404).json("client not found");
      else {
        res.status(200).json(result);
      }
    }
  });
});

//@desc delete a client with its id
router.delete("/:id", authorizeRequest, (req, res) => {
  Client.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) res.status(400).json(err.message);
    else {
      if (!result) res.status(404).json("client not found");
      else res.status(200).json("deleted client " + result.name);
    }
  });
});

// @desc updata a client data
router.patch(
  "/:id",
  authorizeRequest,
  db.upload.single("clientLogo"),
  (req, res) => {
    Client.findOne({ _id: req.params.id }, (err, client) => {
      if (err) res.status(400).json(err.message);
      else {
        if (!client) res.status(404).json("client not found");
        else {
          if (req.body.clientName) client.name = req.body.clientName;
          if (req.file) client.logoUrl = req.file.filename;
          client.save((err) => {
            if (!err) res.status(200).json("updated client " + client.name);
            else res.status(400).json(err.message);
          });
        }
      }
    });
  }
);

module.exports = router;
