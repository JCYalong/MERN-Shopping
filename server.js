const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

require('dotenv').config()

const app = express();


app.use(bodyParser.json());

const MONGO_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Monggo DB Connected...")
    })
    .catch(err => console.log(err));

app.use("/api/items", items);

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))

    });
}

const port = process.env.PORT || 5000;






app.listen(port, () => console.log("Server is running on Port 5000"));