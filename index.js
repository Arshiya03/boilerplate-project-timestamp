// index.js
// where your node app starts

require("dotenv").config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api/:date?", (req, res) => {

  if (req.params.date === null || req.params.date === undefined || req.params.date.trim() === "") {
    const datetime = new Date();
    const unix = datetime.getTime();
    const utc = datetime.toUTCString();
    return res.json({ unix, utc });
  }

  let datetime;

  if (/^\d{13}$/.test(req.params.date)) {
    datetime = new Date(parseInt(req.params.date));
  }
  else {
    datetime = new Date(req.params.date);
    if (isNaN(datetime.getTime())) {
      return res.status(400).json({ error: "Invalid Date" });
    }
  }
  // //Regex
  // //ISO8601 YYYY-MM-DD
  // if (/^\d{4}-\d{2}-\d{2}$/.test(req.params.date))
  //   datetime = new Date(req.params.date);

  // //Unix em milissegundos de 13 digitos
  // else if (/^\d{13}$/.test(req.params.date))
  //   datetime = new Date(parseInt(req.params.date));

  // else return res.status(400).json({ error: "Invalid Date" });

  const unix = datetime.getTime();
  const utc = datetime.toUTCString();

  // res.json({ error: "A" });

  res.json({ unix, utc });
});

//listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});