// Loading dependencies.
var request = require('request');

module.exports = {
    'getLabel': function(name, callback) {
        // console.log("Incoming Event : " + event);
            var options = { 
                method: 'GET',
                url: 'https://rzxagt9l02.execute-api.us-east-1.amazonaws.com/v1/query',
                qs: { path: name },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            request(options, function (error, response, body) {
                if(error){
                    callback(error, null)
                }
                else{
                    //console.log(JSON.parse(body))
                    callback(null, JSON.parse(body))
                }
            });
        }
}