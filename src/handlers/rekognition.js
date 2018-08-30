// Loading dependencies.
var async = require('async')

//Loading local dependencies.
var queryHandlers = require('./query.js');

module.exports = {
    // Getting identity of each person based on images.
    'getIdentity': function (openFaces, cb) {
        var faces = [];
        async.each(openFaces, (name, callback) => {
            queryHandlers.getLabel(name, (err, result) => {
                faces.push({
                    "images": name,
                    "name": result.results
                });
                console.log('Face processed : ' + result.results);
                callback();
            })
        }, function (err, result) {
            if (err) {
                console.log('A face failed to process');
            } else {
                console.log(faces);
                cb(null, faces)
                console.log('All faces have been processed successfully');
            }
        });
    }
}