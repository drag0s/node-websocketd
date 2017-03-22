const utils = require('./utils.js');
const spawn = require('child_process').spawn;


function initProcess(connection, path) {
  connection.process = spawn(path.cmd, path.argvs);

  connection.process.stdout.on('data', data => {
      connection.sendUTF(data);
  });

  connection.process.stdout.on('error', data => {
      connection.sendUTF(data);
  });
}

function onRequest(request, argv) {
	const connection = request.accept('', request.origin);
	utils.log('connected', request.origin);
	let authorized = false;
  if (argv.password === undefined) {
    authorized = true;
    const path = utils.getProcessPath(argv);
    initProcess(connection, path);
    utils.log('authorized successfully', request.origin);
  }

  connection.on('message', function(message) {
      if (message.type === 'utf8') {
        if (!authorized) {
          if (message.utf8Data == argv.password) {
            authorized = true;
            const path = utils.getProcessPath(argv);
            initProcess(connection, path);
            utils.log('authorized successfully', request.origin);
          } else {
            utils.log('authorization failed', request.origin);
          }
        } else {
          utils.log('received data: "' + message.utf8Data + '"', request.origin);
        }
      }
  });
}

module.exports = {
	onRequest: onRequest,
};