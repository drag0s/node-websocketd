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
	utils.log('connected', request.origin);
	var authorized = false;
    if (argv.password === undefined) {
        authorized = true;
        var path = utils.getProcessPath(argv);
        initProcess(connection, path);
		utils.log('authorized successfully', request.origin);
    }

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
        	if (!authorized) {
        		if (message.utf8Data == argv.password) {
        			authorized = true;
                    var path = utils.getProcessPath(argv);
                    initProcess(connection, path);
					utils.log('authorized successfully', request.origin);
        		}
        		else {
        			utils.log('authorization failed', request.origin);
        		}
        	} else {
        		console.log('sent ' + message.utf8Data, request.origin);
        	}
        }
    });
}