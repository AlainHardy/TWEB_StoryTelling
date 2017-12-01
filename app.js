const express = require('express');
const path = require('path');
const fs = require('fs');

let datas = [];

const app = express();

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT) || 3000);

app.use(express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
  res.render('pages/index', { title: 'Pacific Ocean Theater', data: datas });
});

app.listen(app.get('port'), () => {
  datas = JSON.parse(fs.readFileSync('data/NavalWarfare.json', 'utf8'));
  datas.push({
    "name": "Overview",
    "location":{
      "latitude":14.5615291,
      "longitude":178.6969988
    }
  });
  console.log('Listen on port ', app.get('port'));
});
