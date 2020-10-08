const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const WebSocket = require("ws");

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
    console.log(new Date());
    if (new Date().getSeconds() === 0) send();
  }, 1000);
});

//starts server
app.listen(port, () => console.log(`Server is running on port ${port}`));
