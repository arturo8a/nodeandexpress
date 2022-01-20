const bodyParser = require('body-parser')
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use("/",(req,res,next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/",(req,res) => {
  let absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath)
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

app.get('/name', function(req, res) {
  res.json({ name: `${req.query.first} ${req.query.last}`});
});

app.post('/name', function(req, res) {
  const {first,last} = req.body;
  res.json({ name: `${first} ${last}`});
});

app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word});
});

app.get("/json",(req,res) => {

  const mySecret = process.env['MESSAGE_STYLE']
  res.json({"message": mySecret == 'uppercase' ? "Hello json".toUpperCase() : "Hello json"});
});



app.use("/public",express.static( __dirname + "/public"));






































 module.exports = app;
