var tls = require('tls'),
    fs = require('fs');

/* Setting up keys and certificates
 
  openssl genrsa -out ca.key 4096
  openssl req -x509 -new -nodes -key ca.key -days 999 -out ca.pem
  
  openssl genrsa -out server1.key  1024
  openssl req -new -key server1.key -out server1.csr
  openssl x509 -req -days 999 -in server1.csr -CA ca.pem  -CAkey ca.key -set_serial 01 \
  -out server1.pem
  
  openssl genrsa -out client1.key 1024
  openssl req -new -key client1.key -out client1.csr
  openssl  x509 -req -days 999 -in client1.csr -CA ca.pem -CAkey ca.key -set_serial 01 \
  -out client1.pem

 Set => Common Name (e.g. server FQDN or YOUR name) []:localhost
*/

var options = {
    	key : fs.readFileSync('../openssl/server1.key'),
    	cert : fs.readFileSync('../openssl/server1.pem'),
    	ca :   fs.readFileSync('../openssl/ca.pem'),
    	requestCert: true,
    };

var server = tls.createServer(options, function(cleartextStream) {
	'use strict';

  console.log(cleartextStream.getPeerCertificate());
 
  console.log('server connected',
              cleartextStream.authorized ? 'authorized' : 'unauthorized');

  cleartextStream.write("welcome!\n");
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);

});

server.listen(3000);