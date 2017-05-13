var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')
var mongo = require('mongodb');
var mongoose = require('mongoose');
var RSVP = require ('./RSVP.js');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

var url = 'mongodb://localhost:27017/Wedding';
mongoose.connect(url);

app.get('/', function (req, res) {
   res.sendFile('index.html');
});
app.get('/rsvp', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/rsvp.html'));
});
app.get('/admin', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/admin.html'));
});
app.get('/getRSVP', function (req, res) {
  RSVP.find({}, function(err, users) {
    if (err)
      throw err;
    res.send(users);
  });
});
app.post('/rsvp', function (req, res) {
   var rsvp = new RSVP({
     name: req.body.name,
     attending: req.body.attending,
     count: req.body.count
   });

   rsvp.save(function (err, rsvp) {
     if(err) {
       return next(err);
     }
   });
   res.sendFile(path.join(__dirname + '/public/confirm.html'));
});

 var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s", host, port);
});
