var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')
var mongo = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017/Wedding'

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/images", express.static(__dirname + '/images'));
app.use("/bootstrap", express.static(__dirname + '/bootstrap'));
app.use("/index.css", express.static(__dirname + '/index.css'));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/rsvp', function (req, res) {
   res.sendFile(path.join(__dirname + '/rsvp.html'));
})

app.post('/rsvp', function (req, res) {
   var item ={
     name: req.body.name,
     attending: req.body.attending,
   };
   mongo.connect(url, function(err, db){
    assert.equal(null, err);
     db.collection('rsvpList').insertOne(item, function(err, result){
       assert.equal(null, err);
       db.close();
     })

   });
   res.sendFile(path.join(__dirname + '/confirm.html'));
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
