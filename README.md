# node-websocketd
Redirect all data from the STDOUT of a process to a WebSocket server. Inspired by [websocketd](https://github.com/joewalnes/websocketd). Basicly it executes the selected process when someone access successfully to your WebSocket and redirects all the STDOUT data back to the client. Has the option to run a secure WebSocket server (TLS) and you can also set a password for accessing the WebSocket data.

## Download and Install

Node and NPM are required.

```
git clone https://github.com/Drag0s/node-websocketd.git
cd node-websocketd
npm install
```

## Usage

```
$ node app.js --help

    --ssl, --https                  Add https support                    [boolean]
  --ssl-key, --key                Route to SSL key (required if ssl flag)
  --ssl-cert, --cert              Route to SSL certificate (required if ssl
                                  flag)
  --ssl-passphrase, --passphrase  Specifies SSL private passphrase
  --port                          Set the port to listen         [default: 8080]
  -e, --exec                      Set the command you want to execute[required]
  -p, --password                  Set a specific password to the WebSocket
                                  server
```

### Examples

Starting a basic WebSocket server from a specified process:

`node app.js -e=./examples/myShellScript.sh`

Starting a basic WebSocket server from a specified process in a specified port:

`node app.js -e=./examples/myShellScript.sh --port 9999`

Starting a WebSocket server protected with a specified password from a specified process (the process will not execute until recieve the correct password):

`node app.js -e=./examples/myShellScript.sh -password secr3tp4ssw0rd_123`

Starting a TSL WebSocket server from a specified process in a specified port:

`node app.js -e=./examples/myShellScript.sh --port 9999 --ssl --ssl-key=cert/server.key --ssl-cert=cert/server.crt --ssl-passphrase=123412341234`

Starting a TSL WebSocket server from a specified process in a specified port with a specified password **(recomended when dealing with sensible data)**: 

`node app.js -e=./examples/myShellScript.sh --port 9999 --ssl --ssl-key=cert/server.key --ssl-cert=cert/server.crt --ssl-passphrase=123412341234 --password secr3tp4ssw0rd_123`


