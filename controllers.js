var utils = require('./utils.js');
var spawn = require('child_process').spawn;

exports.onRequest = function(request, argv) {
	var connection = request.accept('', request.origin);
	var authorized = false;
	
	var path = utils.getProcessPath(argv);

	connection.process = {};
	
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
        	if (!authorized) {
        		if (message.utf8Data === '1234') {
        			authorized = true;
        			
        			console.log("Client authorized successfully");

        			connection.process = spawn(path.cmd, path.argvs);

					connection.process.stdout.on('data', function(data) {
						connection.sendUTF(data);
					});

					connection.process.stdout.on('error', function(data) {
						connection.sendUTF(data);
					});
        		}
        		else {
        			console.log("Client tried to authorize with " + message.utf8Data);
        		}
        	} else {
        		console.log("Data received from authorized user");
        	}
        }
    });
}