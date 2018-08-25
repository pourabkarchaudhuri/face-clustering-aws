//Required local file Dependencies

// Load Up the Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
const fs = require('fs');
const path = require('path');
var async = require('async');
require('dotenv').config()
var glob = require('glob');
var s3_test = require('./s3_test');
var s3 = require('./s3');
var date = new Date();

//Configuring the Express Middleware
app = express(),
http = require('http'),
httpServer = http.Server(app);
var obj = [];

app.use(express.static(__dirname));

//Set PORT to Dynamic Environments to run on any Server
var port = process.env.PORT || 5000;

//Configure Express to Recieve JSON and extended URLencoded formats
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/dist'));
//Set RESTful routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getImages', function(req, resp) {
    console.log("Called");
    s3_test.ListBuckets((err, res) => {
        if (err) {
            resp.status(200).json({
                "status": 400,
                "results": "no_data"
            })
        } else {
            resp.status(200).json({
                "status": 200,
                "results": res
            })
        }
    })
})

app.post('/tagData', function(req, res) {
    console.log("AJAX calls Request")
    console.log("Request Payload : " + req.body);
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

        // console.log(JSON.stringify(body));
        console.log("+++++++++++++++++++++++++++++");
        console.log("Response from Lambda API, passing to AJAX back")
        console.log(JSON.stringify(body));
        res.send(body);
    });
    // var untagged;
    // fs.readFile('./untagged_values.json', {encoding: 'utf-8'}, function(err,data){
    //     if (err) {
    //         // fs.truncate('./untagged_values.json', 0, function(){console.log('done')})
    //         console.log(err)
    //     } else {
    //         untagged = JSON.parse(data);
    //         req.body.data.forEach((element, i) => {
    //             untagged.data.forEach((ele) => {
    //                 if (element.folder_id == ele.name) {
    //                     ele.name = element.name.replace(/ /g, "_");
    //                     if (element.images != 0) {
    //                         element.images.forEach((imagePath) => {
    //                             untagged.data.forEach((obj) => {
    //                                 obj.images.forEach((img, i1) => {
    //                                     if (img == imagePath) {
    //                                         obj.images.splice(i1, 1);
    //                                     }
    //                                 })
    //                             })
    //                             ele.images.push(imagePath);
    //                         })
    //                     }
    //                 }
    //             })
    //             if (req.body.data.length == i +1) {
    //                 // console.log(JSON.stringify(untagged));
    //                 var images = [];
    //                 var name = null;
    //                 var dataArray = [];
    //                 untagged.data.forEach((element, i1) => {
    //                     name = element.name;
    //                     element.images.forEach((ele) => {
    //                         var tmp = ele.replace('https://s3.amazonaws.com/finddistinctpeoplevideo-s3bucket-1qk0wkjv5fx/', '');
    //                         images.push(tmp)
    //                     })
    //                     dataArray.push({
    //                         "name": name,
    //                         "images": images
    //                     })
    //                     images = [];
    //                     if (untagged.data.length == i1 + 1) {
    //                         // console.log(dataArray);
    //                         var value = {
    //                             "data": dataArray
    //                         }
    //                         console.log(JSON.stringify(value));
    //                         var options = {
    //                             method: 'POST',
    //                             url: 'https://rzxagt9l02.execute-api.us-east-1.amazonaws.com/v1/autotrain',
    //                             headers: {
    //                                 'Content-Type': 'application/json'
    //                             },
    //                             body: value,
    //                             json: true
    //                         };

    //                         request(options, function (error, response, body) {
    //                             if (error) throw new Error(error);

    //                             console.log(JSON.stringify(body));
    //                             res.send("successful");
    //                         });
    //                         // var tagged = JSON.stringify(dataArray);
    //                         // fs.writeFile("./tagged_values.json", tagged, function(err) {
    //                         //     if(err) {
    //                         //         console.log(err);
    //                         //     }
    //                         //     console.log("The file was saved!");
    //                         //     // res.send("successful");
    //                         // });
    //                     }
    //                 })
    //             }
    //         })
    //     }
    // })
    // res.send("success");
});

// Start the server
app.listen(port);
console.log("Server has booted up successfully at PORT : " + port);
