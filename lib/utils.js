function getProcessPath(argv) {
	const exec = argv.e.split(' ');
	const command = exec[0];
	exec.splice(0, 1);
	const splittedArguments = (exec.length > 0) ? exec :  [' '];
	return {cmd: command, argvs: splittedArguments};
}

function log(msg, origin) {
	if (origin) console.log((new Date()).toLocaleString() + ' Connection from origin ' + origin + ' ' + msg + '.');
	else console.log((new Date()).toLocaleString() + ' ' + msg + '.');
}

module.exports = {
	getProcessPath: getProcessPath,
	log: log,
};