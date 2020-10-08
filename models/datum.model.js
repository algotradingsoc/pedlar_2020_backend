const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  eem: {
    type: Number,
  },
  gld: {
    type: Number,
  },
  hyg: {
    type: Number,
  },
  qqq: {
    type: Number,
  },
  slv: {
    type: Number,
  },
  spy: {
    type: Number,
  },
  tlt: {
    type: Number,
  },
});

const Datum = mongoose.model("Datum", dataSchema);

module.exports = Datum;
