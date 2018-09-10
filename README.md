# Project Oversight Dashboard on AWS
##### Supervised Learning and Classifier Training for Face Recognition on AWS Rekognition

## Description
Project Oversight is a robust, enterprise grade multi-tasking convolutional neural net based framework optimized for speed and performance using AWS services here. 

## Inspiration
This project is greatly inspired from the Azure Video Indexer and Google FaceNet, thereby harnessing Google's whitepaper implementations and applying them for real world production ready use cases and environments as a robust solution

* [Google's Facenet] - Face Embeddings whitepapers

### Technology

Oversight uses a number of open source projects to work properly:

* [Node.JS] - A google open-source ML framework
* [Python] - awesome language we love

### Architecture Diagram

##### Architecture for Clustering Pipeline
#
[![Architecture](https://raw.githubusercontent.com/pourabkarchaudhuri/photo-gallery-dashboard-s3/master/Oversight%20on%20AWS.png)](https://nodesource.com/products/nsolid)
##### Architecture for Retraining Pipeline
#
[![ArchitectureII](https://raw.githubusercontent.com/pourabkarchaudhuri/photo-gallery-dashboard-s3/master/Oversight%20on%20AWS%20II.png)](https://nodesource.com/products/nsolid)

## AWS services used for this solution:

* Lambda - serverless containers!
* EC2 - Cloud server
* API Gateway - Service layer
* Cloudwatch - Dashboards and Alarms
* SNS - Notification service
* Elastic Transcoder - Superfast video transcoding and media codec service
* Rekognition - Face Recognition and detection as a service
* SNS - Notification service


### Installation

Project Oversight on AWS requires nodejsv8.11+ to run.

Install the dependencies and devDependencies and start the server.

For EC2 Configuration, Use AMI : Amazon Linux II :

```sh
$ sudo yum update
$ sudo yum install git
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ . ~/.nvm/nvm.sh
$ nvm install 8.11.0
$ npm install -g @angular/cli
$ npm install -g forever
```
For Dashboard Application Startup, clone this repo and follow the steps below :

```sh

$ npm install
$ cd dist/
$ forever start -a -o ./out.log -e ./err.log --uid 'Dashboard' app.js
```
To Kill Application Startup or if PORT 5000 in USE, follow the steps below :

```sh
$ forever stop Dashboard
```

### Todos

 - Optimize Further to increase speed
 - Implement Docker and Jenkins based deployment

License
----

Public


   [Node.JS]: <https://nodejs.org/en/>
   [Python]: <https://www.python.org/>

  
