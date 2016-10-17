var WebSocketServer = require('websocket').server;
var http = require('http');
var argv = require('yargs')
	.alias('e', 'exec')
    .default('port', 8080)
    .alias('p', 'password')
    .alias('ssl', 'https')
    .boolean('ssl')
    .describe('ssl', 'Add https support')
    .describe('ssl-key', 'Route to SSL key')
    .describe('ssl-cert', 'Route to SSL certificate')
    .describe('port', 'Set the port to listen')
    .describe('e', 'Set the command you want to execute')
    .describe('p', 'Set a specific password to the WebSocket server')
    .demand(['e'])
    .implies('ssl', 'ssl-cert')
    .implies('ssl-cert', 'ssl-key')
	.argv;

var controllers = require('./lib/connectionCtrl.js');
var utils = require('./lib/utils.js');

var PORT = argv.port;

if (argv.password === undefined) console.log("\033[31m\nWARNING: It is recommended to set a password and use encrypted connections with sensible data.\n \x1b[0m")

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(PORT, function() {
    utils.log('Server is listening on port ' + PORT);
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function(request) {
    controllers.onRequest(request, argv);
});