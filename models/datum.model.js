const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  data: {
    type: Object,
    required: true,
  },
});

const Datum = mongoose.model("Datum", dataSchema);

module.exports = Datum;
