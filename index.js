const path = require("path");
var bodyParser = require('body-parser');
const util = require('util');
const express = require("express");
const cors = require('cors')({origin: true});

const { login, verifyToken } = require("./server/auth.js");
const { getDocs, postDoc, delDoc, postRequest, getRequest, delRequest, getProfile, getHistory, putProfile, putHistory } = require("./server/db.js");
const { print } = require("./server/print.js");


const app = express();
app.use(cors);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//Public
app.post("/request", postRequest);
app.get("/secured/docs", getDocs);

app.get("/profile", getProfile);
app.get("/history", getHistory);



//Admin

app.get("/secured/requests", getRequest);

app.post("/secured/doc", postDoc);
app.post("/secured/request/print", print);

app.delete("/secured/doc/:id", delDoc);
app.delete("/secured/request/:id", delRequest);

app.put("/secured/profile", putProfile);
app.put("/secured/history", putHistory);

//Auth
app.post("/secured/verifyToken", verifyToken);
app.post("/secured/login", login);





// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.listen(8000, () => {
    console.log();
    console.log(util.inspect("################################################################", false, null, true));
    console.log(util.inspect("#### BARANGAY MANAGEMENT SYSTEM is now running at port 8000 ####", false, null, true));
    console.log(util.inspect("################################################################", false, null, true));
    console.log(util.inspect("----------------------------------------------------------------", false, null, true));
    console.log(util.inspect("To Open:", false, null, true));
    console.log(util.inspect("  1. Go to your web browser (e.g. Google Chrome).", false, null, true));
    console.log(util.inspect("  2. Then type http://localhost:8000 in your web browser's address bar.", false, null, true));
    console.log(util.inspect("  3. Press enter on your keyboard. Viola!", false, null, true));
    console.log(util.inspect("----------------------------------------------------------------", false, null, true));
});