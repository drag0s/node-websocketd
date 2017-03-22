const WebSocketServer = require('websocket').server;
const fs = require('fs');
const argv = require('./lib/arguments');

const httpServer = (argv.ssl) ? require('https') : require('http');

const controllers = require('./lib/connectionCtrl.js');
const utils = require('./lib/utils.js');

const PORT = argv.port;

if (!argv.password) console.log("\033[31m\nWARNING: It is recommended to set a password and use encrypted connections with sensible data.\n \x1b[0m")

function processReq(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
}

let server;
if (argv.ssl) {
  server = httpServer.createServer({
    key: fs.readFileSync(argv.key, 'utf8'),
    cert: fs.readFileSync(argv.cert, 'utf8'),
    passphrase: argv.passphrase.toString()
  }, processReq).listen(PORT);
} else {
	server = httpServer.createServer(processReq).listen(PORT);
}

server.listen(PORT, () => {
	utils.log('Server is listening on port ' + PORT);
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', request => {
  controllers.onRequest(request, argv);
});