const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const githubAuth = require("./src/routes/auth/github");
const { default: mongoose } = require("mongoose");

const clientId = process.env.clientId;
const clientSecreat = process.env.clientSecreat;

const connectionString = process.env.connection_string;
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", githubAuth);

app.get("/", (req, res) => {
    res.send("App is 💓💓");
});

// mongoose.set("strictQuery", true);   
mongoose
    .connect(connectionString)
    .then(console.log("Database Connected"))
    .catch((e) => {
        console.log(e);
        console.log("EROR CONNECTING");
    });

app.listen(4000, function () {
    console.log("http://localhost:4000");
});
