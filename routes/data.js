const router = require("express").Router();
const Datum = require("../models/datum.model");

//api access to data
router.route("/").get((request, res) => {
  Datum.find()
    .sort({ _id: -1 })
    .limit(50)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;
