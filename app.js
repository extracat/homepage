//Simple Node.js Hello World

var http = require('http');
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

if (appEnv.isLocal) {
	var host = "localhost";
	var port = 3000;
}
else
{
	var host = appEnv.host;
	var port = appEnv.port;
}

var server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
