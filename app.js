const express = require('express');
const path = require('path');
const fs = require('fs');

let datas = [];
let texts = [];

const app = express();

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT) || 3000);

app.use(express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
  res.render('pages/index', { title: 'Pacific Ocean Theater', data: datas, text: texts });
});

app.get('/data', (req, res) => {
  res.send(JSON.parse(fs.readFileSync('data/NavalWarfare.json', 'utf8')));
});

app.listen(app.get('port'), () => {
  // Load the data file on start of the app
  datas = JSON.parse(fs.readFileSync('data/NavalWarfare.json', 'utf8'));
  texts = JSON.parse(fs.readFileSync('data/texts.json', 'utf8'));
  // Add an overall point of view to the data
  /* eslint quote-props:"off", quotes: off */
  datas.push({
    "name": "Overview",
    "start": "1941-12-7",
    "end": "1945-6-22",
    "location": {
      "latitude": 10.853564,
      "longitude": 155.142831,
    },
  });
  console.log('Listen on port ', app.get('port'));
});
