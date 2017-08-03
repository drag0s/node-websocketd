# node-websocketd
Redirect all data from the STDOUT of a process to a WebSocket server. Inspired by [websocketd](https://github.com/joewalnes/websocketd). Basicly it executes the selected process when someone access successfully to your WebSocket and redirects all the STDOUT data back to the client. Has the option to run a secure WebSocket server (TLS) and you can also set a password for accessing the WebSocket data.

## Download and Install

Node and NPM are required.

```
npm install -g node-websocketd
```

## Usage

```
$ node-websocketd --help

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

You can also set arguments with ENV variables. Just set the argument name you want with the prefix `NWS_`.

### Examples

Starting a basic WebSocket server from a specified process:

`node-websocketd -e=./examples/myShellScript.sh`

Starting a basic WebSocket server from a specified process in a specified port:

`node-websocketd -e=./examples/myShellScript.sh --port 9999`

Starting a WebSocket server protected with a specified password from a specified process (the process will not execute until recieve the correct password):

`node-websocketd -e=./examples/myShellScript.sh -password secr3tp4ssw0rd_123`

Starting a TSL WebSocket server from a specified process in a specified port:

`node-websocketd -e=./examples/myShellScript.sh --port 9999 --ssl --ssl-key=cert/server.key --ssl-cert=cert/server.crt --ssl-passphrase=123412341234`

Starting a TSL WebSocket server from a specified process in a specified port with a specified password **(recomended when dealing with sensible data)**:

`node-websocketd -e=./examples/myShellScript.sh --port 9999 --ssl --ssl-key=cert/server.key --ssl-cert=cert/server.crt --ssl-passphrase=123412341234 --password secr3tp4ssw0rd_123`

Setting arguments with ENV variables:

`NWS_EXEC=./examples/myShellScript.sh NWS_P=9999 NWS_PASSWORD=secr3tp4ssw0rd_123 NWS_SSL=true NWS_SSL_KEY=cert/server.key NWS_SSL_CERT=cert/server.crt NWS_SSL_PASSPHRASE=123412341234 node-websocketd`
