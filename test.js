// var starter = "2012_Abhishek_dash_11111_14.png";
// var specialVal = "asdf";
var fs = require('fs');

// // var re = /(_)(\d+)/g;
// var re = /(\d+)(_)(\d+)/g;
// // var re = /(\d+)/g;
// // var re = /(\d+)(_)(\d+)(.png)/g

// var replaced = starter.replace(re, function (match, p1, p2, p3) {
//     console.log(match);
//     console.log(p1)
//     console.log(p2);
//     console.log(p3)
//     // console.log(p4)
//     // console.log(p5)
//     // return p1 + specialVal;
// });

// console.log(starter);

// var date = new Date()
// console.log(date.getTime());

// fs.readFile('./untagged_values.json', {encoding: 'utf-8'}, function(err,data){
//     if (!err) {
//         console.log('received data: ' + JSON.parse(data));
//         fs.truncate('./untagged_values.json', 0, function(){console.log('done')})

//     } else {
//         console.log(err);
//     }
// })



var name = "LokeshKosuri";

name = name.replace(/ /g, "_");

console.log(name);




console.log(event.dataTransfer.getData('text'));
    $('img[id="'+ event.dataTransfer.getData('text') +'"]').each(function(i, el) {
        // var childDiv = element.getElementsByTagName('div')[0];
        // var requiredDiv = childDiv.getElementsByTagName('div')[0];
        _(event.target.id).getElementsByTagName('img')[0].src = _(event.dataTransfer.getData('text')).src;

        console.log("DRAG AND DROP: " + _(event.target.id).getElementsByTagName('img')[0].src);
    });
