const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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

// express middleware
app.use(cors());
app.use(express.json());

const dataRouter = require("./routes/data");

app.use("/data", dataRouter);

//starts server
app.listen(port, () => console.log(`Server is running on port ${port}`));
