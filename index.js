// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let input = req.params.date;

  // Check if the input is empty -> return current date and time
  if (!input) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Check if the input is a valid Unix timestamp (all numeric)
  if (/^\d+$/.test(input)) {
    const unixDate = new Date(parseInt(input));
    return res.json({ unix: unixDate.getTime(), utc: unixDate.toUTCString() });
  }

  // Check if the input is a valid date string
  const parsedDate = new Date(input);
  if (!isNaN(parsedDate.getTime())) {
    return res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
  }

  // If none of the above, return an error
  return res.json({ error: "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
