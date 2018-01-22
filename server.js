var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var RSVP = require('./RSVP.js');
const sanitize = require('mongo-sanitize');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Wedding';
console.log('Mongo URI: ', uri);

mongoose.connect(uri);

app.get('/', function (req, res) {
  res.sendFile('index.html');
});
app.get('/rsvp', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/admin.html'));
});
app.get('/getRSVP', function (req, res) {
  RSVP.find({}, function (err, users) {
    if (err) {
      throw err;
    }
    res.send(users);
  });
});
app.post('/rsvp', function (req, res) {
  let { name, attending, count } = req.body || {};

  name = sanitize(name);
  attending = sanitize(attending);
  count = sanitize(count);

  var rsvp = new RSVP({
    name,
    attending,
    count
  });

   rsvp.save(function (err, rsvp) {
     if(err) {
       return next(err);
     }
   });
   res.sendFile(path.join(__dirname + '/public/confirm.html'));
});

const port = process.env.PORT || 8081;

 var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s", host, port);
});
