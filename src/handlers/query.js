// Loading dependencies.
var request = require('request');
require('dotenv').config()



module.exports = {
    'getLabel': function(name, callback) {
        // console.log("Incoming Event : " + event);
            var options = { 
                method: 'GET',
                url: process.env.REKOG_API + '/' + process.env.API_VERSION + '/query',
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