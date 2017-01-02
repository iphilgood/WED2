const http = require('http');
const url = require('url');
const fs = require('fs');
const LoopFromTo = require('./loopFromTo.js')

const hostname = '127.0.0.1';
const port = 3000;

function handleNumbers(req, res) {
  var urlParts = url.parse(req.url, true);
  var params = urlParts.query;

  var from = parseInt(params.from) || 1;
  var to = parseInt(params.to) || 50;

  res.writeHeader(200, { "Content-Type": "text/html" });

  LoopFromTo.loop(res, from, to);

  res.end();
}

function handleFile(req, res) {
  fs.writeFile("datum.txt", new Date().toLocaleString(), function (err) {
    fs.readFile("datum.txt", function(err, content){
      res.end(content);
    });
  });
}

function sendFile(res, fileName, contentType) {
  fs.readFile(fileName, function (err, data) {
    if (err) { throw err; }
    res.writeHeader(200, { "Content-Type": contentType });
    res.write(data);
    res.end();
  });
}

const server = http.createServer((req, res) => {
  if (req.url.indexOf("/numbers") === 0) {
    handleNumbers(req, res);
  } else if (req.url.indexOf("/file") === 0) {
    handleFile(req, res);
  } else if (req.url === "/ToSendHtml.html") {
    sendFile(res, "ToSendHtml.html", "text/html");
  } else if (req.url === "/ToSendJavaScript.js" ) {
    sendFile(res, "ToSendJavaScript.js", "text/javascript");
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('You requested ' + req.url);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
