var WebSocketServer = require('websocket').server;
var http = require('http');
var argv = require('yargs')
	.alias('e', 'exec')
    .default('p', 8080)
    .alias('p', 'port')
	.demand(['e'])
	.argv;

var controllers = require('./controllers.js');

var PORT = argv.port;


var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(PORT, function() {
    console.log((new Date()) + ' Server is listening on port ' + PORT);
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function(request) {
    controllers.onRequest(request, argv);
});