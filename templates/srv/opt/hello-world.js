//Lets require/import the HTTP module
var http = require('http');
var os = require('os');


//Lets define a port we want to listen to
const PORT=8080;
var name = "World";

var options = {
        host: 'api.icndb.com',
        path: '/jokes/random'
};

if (process.env.LOCAL_USER) {
        name = process.env.LOCAL_USER;
        options.path = options.path + "?firstName="+name+"&lastName=";
}
//We need a function which handles requests and send response
function handleRequest(request, response){
        var msg = 'Hello '+name+' the application that responded to this request was ' + os.hostname();

        http.get(options, function (http_res) {
            // initialize the container for our data
            var data = "";

            // this event fires many times, each time collecting another piece of the response
            http_res.on("data", function (chunk) {
                // append this chunk to our growing `data` var
                data += chunk;
            });

            // this event fires *one* time, after all the `data` events/chunks have been gathered
            http_res.on("end", function () {
                // you can use res.send instead of console.log to output via express
                var jokeData = JSON.parse(data);
		msg += "\n"
                msg += "Here's a joke for you : " + jokeData.value.joke;
		msg += "\n"
                response.end(msg);
            });
        });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

