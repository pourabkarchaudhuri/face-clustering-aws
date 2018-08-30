// Loading dependencies.
var express = require('express');
var app = express();
var router = express.Router();

var request = require("request");
require('dotenv').config()

//Required local file Dependencies
var s3Handlers = require('./handlers/s3');
var rekognitionHandlers = require('./handlers/rekognition.js');


router.get('/getImages', (req, res) => {
    s3Handlers.ListBuckets((err, response) => {
        if (err) {
            res.status(200).json({
                "status": 400,
                "results": "no_data"
            })
        } else {
            res.status(200).json({
                "status": 200,
                "results": response
            })
        }
    })
})

router.post('/tagData', (req, res) => {
    var options = {
        method: 'POST',
        url: 'https://rzxagt9l02.execute-api.us-east-1.amazonaws.com/v1/autotrain',
        headers: {
            'Content-Type': 'application/json'
        },
        body: req.body,
        json: true
    };

    request(options, function (error, response, body) {
        if (error){
            res.send(error)
        }
        res.send(body);
    });
})

router.get('/deleteObjects', (req, res) => {
    if (typeof req.body.images !== 'undefined' && req.body.images.length > 0) {
        s3Handlers.DeleteMultipleObject(req.body.images, (err, result) => {
            console.log(result);
            if (err) {
                res.status(200).json({
                    "status": 400,
                    "message": "Error Occurred"
                })
            } else {
                res.status(200).json({
                    "status": 200,
                    "message": "deleted successfully"
                })
            }
        })
    } else {
        res.status(200).json({
            "status": 415,
            "message": "There are no images in the bin to delete"
        })
    }
})

router.post('/getPlaceholder', (req, res) => {
    console.log(req.body.clusterImageArray);
    rekognitionHandlers.getIdentity(req.body.clusterImageArray, (err, result) => {
        res.status(200).json(result);
    })
})

module.exports = router;