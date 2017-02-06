//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080;

var ifs = require('os').networkInterfaces();
var ips = Object.keys(ifs)
  .map(x => [x, ifs[x].filter(x => x.family === 'IPv4')[0]])
  .filter(x => x[1])
  .map(x => x[1].address);


//We need a function which handles requests and send response
function handleRequest(request, response){
	    response.end('Hello World: ' + request.url + ' ' + ips);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

