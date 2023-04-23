const express = require("express");
const app = express();
const server = require('http').createServer(app);
const home = require('./routes/home/index');
const bodyParser = require("body-parser");


app.use(express.static('public'));



app.set("views","./views");
app.set("view engine","ejs");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use("/",home);

module.exports = server;