var http = require('http');
var fs = require('fs'); // filesystem
var url = require('url'); // url module

var port = 8080;

const fileExists = filename => {
  var s = './pages' + filename;
  return fs.existsSync(s);
}

http.createServer((req, res) => {
  var q = url.parse(req.url, true);
  var path = q.pathname;
  if (fileExists(path)) {
    var filename;
    path === '/' ? filename = './pages/index.html' : filename = './pages' + path;
    fs.readFile(filename, (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    })
  } else {
    fs.readFile('./pages/404.html', (err, data) => {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    })
  }
}).listen(port);

console.log(`Server is running on port ${port}`);