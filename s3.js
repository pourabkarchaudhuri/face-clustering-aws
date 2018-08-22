'use strict';
 
const BUCKET_NAME = 'finddistinctpeoplevideo-s3bucket-1qk0wkjv5fx'; //Put in ENV
const BUCKET_REGION = 'us-east-1'; //Put in ENV
const IDENTITY_POOL_ID = 'us-east-1:9dca686d-d9d2-4e49-9941-345018888fdc'; //Put in ENV
const SUB_FOLDER_NAME = 'supervised_training' // Put in ENV
//Load Environment Variables
 
var AWS = require('aws-sdk')
//Load Required Dependencies
 
AWS.config.update({
  region: BUCKET_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
  })
});
//Initiate Cognito Session and Authenticate Tokens
// var BUCKET_NAME = 'finddistinctpeoplevideo-s3bucket-1qk0wkjv5fx';
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: BUCKET_NAME}
});
 
module.exports = {
    //End of ListObject queryHandlers
    'CopyObject': function(oldName, newName, callback) {
        console.log("Copy Object Module")
        console.log(oldName);
        console.log(newName);
        var renamedClusterId = "Pourab_Karchadhuri" //Replace Space with underscore
        var count = "0"; //use count.toString() if integer.
        var OLD_KEY = SUB_FOLDER_NAME + '/' + oldName +'.png';   //GET THIS FROM LISTOBJECTS and iterate through
        var NEW_KEY = SUB_FOLDER_NAME + '/'  + newName + '.png';
        var copySource = BUCKET_NAME + '/' + OLD_KEY
        var params = {
            Bucket: BUCKET_NAME,
            CopySource: copySource,
            Key: NEW_KEY
        };

        s3.copyObject(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                callback(err, null, null)
            } // an error occurred
            else {
                console.log(data);
                callback(null, data)//OLD_KEY is the old path
            }
        });
    },
    //End of CopyObject queryHandlers
    
    'DeleteObject': function(oldName, callback) {
        console.log("Delete Object Module");
        var params = {
            Bucket: BUCKET_NAME,
            Key: SUB_FOLDER_NAME + "/" + oldName + ".png"
        };
        s3.deleteObject(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                callback(err, null)
            } // an error occurred
            else {
                console.log(data);
                callback(null, data) //OLD_KEY is the old path
            } // successful response
        });

    } //End od DeleteObject queryHandlers
}