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
    
    s3Handlers.ListBuckets(req.query.video, (err, response) => {
        if (err) {
            res.status(200).json({
                "status": 400,
                "results": "no_data"
            })
        } else {
            
            // console.log(response);
            
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
        url: process.env.REKOG_API + '/' + process.env.API_VERSION + '/autotrain',
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

router.post('/deleteObjects', (req, res) => {
    if (typeof req.body.images !== 'undefined' && req.body.images.length > 0) {
        s3Handlers.DeleteMultipleObject(req.body.images, (err, result) => {
            // console.log(result);
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
    // console.log(req.body.clusterImageArray);
    rekognitionHandlers.getIdentity(req.body.clusterImageArray, (err, result) => {
        console.log(result);
        res.status(200).json(result);
    })
})

router.get('/getAllClusterVideos', (req, res) => {
    s3Handlers.listVideoObjects((err, result) => {
        
        if (err) {
            res.status(200).json({
                "status": 400,
                "message": "Error Occurred"
            });
        } else {
            res.status(200).json({
                "status": 200,
                "message": "success",
                "result": result
            });
        }
    })
})

router.get('/getCluster', (req, res) => {
    s3Handlers.listVideoObjects((err, result) => {
        if (err) {
            res.status(200).json({
                "status": 400,
                "message": "Error Occurred"
            });
        } else {
            res.status(200).json({
                "status": 200,
                "message": "success",
                "result": result
            });
        }
    })
})

router.get('/deleteAll', (req, res) => {
    var dataArray = [];
    var deleteImagesArray = [];
    var dataToDelete = JSON.parse(req.query.clustersToDelete);
    var videoToDelete = JSON.parse(req.query.videoToDelete);

    dataArray.push({
        Key: videoToDelete[0].Key
    });
    
    // console.log(dataArray);
    s3Handlers.DeleteMultipleObject(dataArray, (err, result) => {
        if (err) {
            res.status(200).json({
                "status": 400,
                "message": "Error Occurred"
            })
        } else {
            s3Handlers.listImageObjects(dataToDelete[0].Key, (err, result) => {
                result.forEach((element, i) => {
                    deleteImagesArray.push({
                        'Key': element
                    })

                    if (result.length == i + 1) {
                        s3Handlers.DeleteMultipleObject(deleteImagesArray, (err, result) => {
                            if (err) {
                                res.status(200).json({
                                    "status": 400,
                                    "message": "Error Occurred"
                                })
                            } else {
                                dataArray = [];
                                dataArray.push({
                                    Key: dataToDelete[0].Key
                                });
                                s3Handlers.DeleteMultipleObject(dataArray, (err, result) => {
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
                            }
                        })
                    }
                })
            })
        }
    })
})

module.exports = router;