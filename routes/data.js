const router = require("express").Router();
let Datum = require("../models/datum.model");

//api access to data
router.route("/").get((request, res) => {
  Datum.find()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json("Error: " + error));
});

//api post endpoint
router.route("/add").post((request, res) => {
  const eem = request.body.eem;
  const gld = request.body.gld;
  const hyg = request.body.hyg;
  const qqq = request.body.qqq;
  const slv = request.body.slv;
  const spy = request.body.spy;
  const tlt = request.body.tlt;
  const newDatum = new Datum({
    eem,
    gld,
    hyg,
    qqq,
    slv,
    spy,
    tlt,
  });

  newDatum
    .save()
    .then(() => res.json("New datum added"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;
