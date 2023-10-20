const path = require("path");
var bodyParser = require('body-parser');
const util = require('util');
const express = require("express");
const cors = require('cors')({origin: true});


const { getDocs, postDoc } = require("./server/db.js");
const { login, verifyToken } = require("./server/auth.js");

const app = express();
app.use(cors);
app.use(express.static(path.join(__dirname, "public")));

const jsonParser = bodyParser.json();

app.post("/request", jsonParser, postDoc);
app.get("/secured/docs", getDocs);


app.post("/secured/verifyToken", jsonParser, verifyToken);
app.post("/secured/login", jsonParser, login);


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "server/404.html")));

app.listen(8000, () => {
    console.log(util.inspect("Barangay Management Sytem is now running at http://localhost:8000/", false, null, true));
    console.log();
});