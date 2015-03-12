var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var iotorrent = require('./iotorrent');
var app = express();
var port = process.env.PORT || 8888;
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://mongodb/iotorrent', function(err, db) {
  if (err) return;
  iotorrent.db = db;
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: './uploads/'}));

app.get('/*', function(req, res){
  res.send('');
});

app.post('/:collection', function(req, res){
  if (!iotorrent.db) {
    res.status(500).json('');
    return;
  }

  var subject = req.body.subject;
  var magnet = req.body.magnet;
  if (!subject || !magnet) {
    res.status(400).json('');
    return;
  }

  res.json('');

  var collection = iotorrent.db.collection(req.params.collection);
  collection.findOne({magnet: magnet}, function(err, doc){
    if (err || doc) return;

    collection.insert(req.body, function(err, result){
    });
  });

});

app.listen(port);