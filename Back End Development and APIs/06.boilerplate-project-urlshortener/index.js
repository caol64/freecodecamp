require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

const map = new Map();
const regex = /^(https?|http):\/\/([\w/\-?=%.]+\.[\w/\-?=%.]+)$/;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint
app.get('/api/shorturl/:shortUrl', function(req, res) {
  let urlKey = Number(req.params.shortUrl);
  if (!isNaN(urlKey) && map.get(urlKey)) {
    res.redirect(map.get(urlKey));
  } else {
    res.json({error: 'invalid url'});
  }
});

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  if (regex.test(url)) {
    let size = map.size;
    map.set(++size, url);
    res.json({
      original_url: url,
      short_url: size
    });
  } else {
    res.json({error: 'invalid url'});
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
