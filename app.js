var WebSocketServer = require('websocket').server;
var http = require('http');

var PORT = 8099;

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
    var connection = request.accept('', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
        }
    });
    var i = 0;
    setInterval(function() {
    	connection.sendUTF("Seconds since connected: " + i);
    	++i;
    }, 1000)
});