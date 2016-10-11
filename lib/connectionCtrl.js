var utils = require('./utils.js');
var spawn = require('child_process').spawn;


var initProcess = function(connection, path) {
    connection.process = spawn(path.cmd, path.argvs);

    connection.process.stdout.on('data', function(data) {
        connection.sendUTF(data);
    });

    connection.process.stdout.on('error', function(data) {
        connection.sendUTF(data);
    });
}

exports.onRequest = function(request, argv) {
	var connection = request.accept('', request.origin);
    connection.process = {};

	var authorized = false;
    if (argv.password === undefined) {
        authorized = true;
        var path = utils.getProcessPath(argv);
        initProcess(connection, path);
        console.log("Client authorized successfully");
    }

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
        	if (!authorized) {
        		if (message.utf8Data == argv.password) {
        			authorized = true;
                    var path = utils.getProcessPath(argv);
                    initProcess(connection, path);
        			console.log("Client authorized successfully");
        		}
        		else {
        			console.log("Client tried to authorize with " + message.utf8Data);
        		}
        	} else {
        		console.log("Data " + message.utf8Data + " received from authorized user");
        	}
        }
    });
}