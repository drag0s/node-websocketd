const WebSocketServer = require('websocket').server;
const fs = require('fs');
const argv = require('yargs')
	.alias('e', 'exec')
    .default('port', 8080)
    .alias('p', 'password')
    .alias('ssl', 'https')
    .boolean('ssl')
    .alias('ssl-key', 'key')
    .alias('ssl-cert', 'cert')
    .alias('ssl-passphrase', 'passphrase')
    .describe('ssl', 'Add https support')
    .describe('ssl-key', 'Route to SSL key (required if ssl flag)')
    .describe('ssl-cert', 'Route to SSL certificate (required if ssl flag)')
    .describe('ssl-passphrase', 'Specifies SSL private passphrase')
    .describe('port', 'Set the port to listen')
    .describe('e', 'Set the command you want to execute')
    .describe('p', 'Set a specific password to the WebSocket server')
    .demand(['e'])
    .implies('ssl', 'ssl-cert')
    .implies('ssl-cert', 'ssl-key')
    .implies('ssl-key', 'ssl-passphrase')
	.argv;

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