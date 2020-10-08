const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const Datum = require("./models/datum.model");
const fetch = require("node-fetch");

// Datum.deleteMany({}).then(console.log("removed"));

//configure environment variables
require("dotenv").config();

//creates express server
const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGODB connected");
});

//api route
const dataRouter = require("./routes/data");

// express middleware
app.use(cors());
app.use(express.json());
app.use("/data", dataRouter);

//websocket
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("A new client connected");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  const send = () => ws.send(`${new Date()}`);
  setInterval(function () {
    if (new Date().getSeconds() === 0) send();
  }, 1000);
});

//auto data fetching
setInterval(function () {
  if (new Date().getSeconds() === 55) {
    fetch(
      "https://api.iextrading.com/1.0/tops?symbols=eem,gld,hyg,qqq,slv,spy,tlt"
    )
      .then((res) => res.json())
      .then((data) => {
        const newDatum = new Datum({
          data,
        });

        Datum.countDocuments().then((count) => {
          console.log(count);
          if (count > 49) {
            Datum.findOne().then((res) => Datum.deleteOne({ _id: res["_id"] }));
            console.log("deleted first one ");
          }
          newDatum
            .save()
            .then(() => console.log("data saved"))
            .catch((error) => console.log(error));
        });
      });
  }
}, 1000);

//starts server
app.listen(port, () => console.log(`Server is running on port ${port}`));
