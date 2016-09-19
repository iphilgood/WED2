var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

function random(){
  return (Math.floor((Math.random() * 10) + 1)-5)/10;
}

function createDate(month){
  return new Date(2016, month, 1);
}

function round(num){
  return Math.round(num * 100) / 100
}

function createData(months){

  var data = [];
  data.push({
    'firma': "Alphabet Inc. (C)",
    'verlauf' : createKurs(months, 890)
  });

  data.push({
    'firma': "Microsoft Corp.",
    'verlauf' : createKurs(months, 50)
  });

  data.push({
    'firma': "Amazoncom",
    'verlauf' : createKurs(months, 706)
  });

  return data;
}
function createKurs(month, startKurs){
  var kurs = [];

  var newkurs = startKurs;
  for(var i=0; i<month;i++)
  {
    var change = random();
    newkurs =  round(newkurs + newkurs * change);
    kurs.push({datum: createDate(i), 'aktueller-kurs': newkurs, 'unterschied': change, 'gestiegen' : change >= 0})
  }
  return kurs;
}

function createTimeRange(month){
  var times = [];
  for(var i=0; i<month;i++) {
    times.push(createDate(i));
  }
  return times;
}

app.get('/api/aktienkurse', function (req, res) {
  res.json({aktienkurse : createData(req.query.monate), 'datums-bereich': createTimeRange(req.query.monate)});
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
