var AWS = require('aws-sdk');
var moment = require('moment');
require('dotenv').config()
var fs = require('fs');
var re = /(\d+)(_)(\d+)/g;
var request = require('request');


var albumBucketName = process.env.ALBUM_BUCKET_NAME;
var bucketRegion = process.env.BUCKET_REGION;
var IdentityPoolId = process.env.IDENTITY_POOL_ID;
var URL = process.env.BUCKET_URL;
var outputKey = process.env.OUTPUT_KEY
var inputKey = process.env.VIDEO_KEY

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: albumBucketName }
});

module.exports = {
    // ListBuckets()
    "ListBuckets": function (video, callback) {
        var params = {
            Bucket: albumBucketName, /* required */
            FetchOwner: false,
            MaxKeys: 5000, //Play with this and Next Tokens
            Prefix:  outputKey + '/' + video
        };

        s3.listObjectsV2(params, function (err, data) {
            var keyArray = [];
            if (err) console.log(err, err.stack); // an error occurred
            // if (data.KeyCount != 1) {
                // data.Contents.splice(0, 1);
                var clusterIndex = [];
                dataArray = [];
                images = [];
                var name = null;
                data.Contents.forEach((element, i) => {
                    keyArray.push(element.Key.split('/')[2]);
                })
                keyArray.forEach((element, i) => {
                    element.replace(re, (match, p1, p2, p3) => {
                        clusterIndex.push(p1);
                    })
                })
                var uniqueClusterIndex = clusterIndex.filter((v, i, a) => a.indexOf(v) === i);
                uniqueClusterIndex = uniqueClusterIndex.sort(function(a, b){return a - b});
                uniqueClusterIndex.forEach((id) => {
                    name = "Person-" + (parseInt(id) + 1);
                    images = [];
                    data.Contents.forEach((element, i) => {
                        element.Key.replace(re, (match, p1, p2, p3) => {
                            if (p1 == id) {
                                var imageURL = URL + element.Key;
                                images.push(imageURL);
                            }
                        })
                    })
                    dataArray.push({
                        'name': name,
                        'images': images
                    })
                    if (uniqueClusterIndex.length == dataArray.length) {
                        var value = {
                            "data": dataArray
                        }
                        value = JSON.stringify(value);
                        callback(null, dataArray);
                    }
                })
        });
    },
    "listBucketElements": function (callback) {
        var params = {
            Bucket: albumBucketName, /* required */
            FetchOwner: false,
            MaxKeys: 5000, //Play with this and Next Tokens
            Prefix: outputKey
        };

        s3.listObjectsV2(params, function (err, data) {
            callback(null, data);
        })
    },
    'DeleteMultipleObject': function (objectList, callback) {
        console.log("Multiple Delete Object Module");
        var params = {
            Bucket: albumBucketName,
            Delete: {
                Objects: objectList,
                Quiet: false
            }
        };
        s3.deleteObjects(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                callback(err, null)
            } // an error occurred
            else {
                callback(null, data) //OLD_KEY is the old path
            } // successful response
        });

    },//End od DeleteObject queryHandlers
    "listVideoObjects": function (callback) {
        var params = {
            Bucket: albumBucketName, /* required */
            FetchOwner: false,
            MaxKeys: 5000, //Play with this and Next Tokens
            Prefix: inputKey + '/'
        };

        s3.listObjectsV2(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            if (data.KeyCount != 1) {
                data.Contents.splice(0, 1);
                var videoObjectsArray = [];
                data.Contents.forEach((element, i) => {
                    var date = new Date(element.LastModified);
                    var dt = moment(date).format('lll');
                    videoObjectsArray.push({
                        "videoURL": URL + element.Key,
                        "videoName": element.Key.split('/')[1],
                        "dateModified": dt
                    });


                    if (data.Contents.length == i + 1) {
                        videoObjectsArray.sort(function(a, b) {
                            // console.log(b);
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(b.dateModified) - new Date(a.dateModified);
                        });
                        callback(null, videoObjectsArray);
                    }
                });
            } else {
                callback("no_data", null)
            }
        });
    },
    'listImageObjects': function (video, callback) {
        var params = {
            Bucket: albumBucketName, /* required */
            FetchOwner: false,
            MaxKeys: 5000, //Play with this and Next Tokens
            Prefix: video
        };

        s3.listObjectsV2(params, function (err, data) {
                // data.Contents.splice(0, 1);
                var clusterIndex = [];

                data.Contents.forEach((element, i) => {
                    clusterIndex.push(element.Key);

                    if (data.Contents.length == i + 1) {
                        callback(null, clusterIndex);
                    }
                })
        });
    }
}
