const path = require("path");
var bodyParser = require('body-parser');
const util = require('util');
const express = require("express");
const { getDocs } = require("./server/db.js");

const { login, verifyToken } = require("./server/auth.js");

const app = express();
const jsonParser = bodyParser.json();
app.use(express.static(path.join(__dirname, "public")));


app.get("/secured/docs", getDocs);

app.get("/", function (req, res) {
    return res.sendFile(path.join(__dirname, "public/index.html"));
});


app.post("/secured/verifyToken", jsonParser, verifyToken);
app.post("/secured/login", jsonParser, login);


app.get('*', function(req, res){
    // return res.status(400).send('Error 404. Page not found.');
    return res.sendFile(path.join(__dirname, "server/404.html"));
});

app.listen(8000, () => {
    console.log(util.inspect("Barangay Management Sytem is now running at http://localhost:8000/", false, null, true));
    console.log();
});