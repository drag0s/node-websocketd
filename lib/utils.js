exports.getProcessPath = function(argv) {
	var exec = argv.e;
	exec = exec.split(' ');
	var command = exec[0];
	exec.splice(0, 1);
	if (exec.length > 0) var arguments = exec;
	else var arguments = [' '];
	return {cmd: command, argvs: arguments};
}

exports.log = function(msg, origin) {
	if (origin) console.log((new Date()).toLocaleString() + ' Connection from origin ' + origin + ' ' + msg + '.');
	else console.log((new Date()).toLocaleString() + ' ' + msg + '.');
}