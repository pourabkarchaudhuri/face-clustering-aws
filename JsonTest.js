var fs = require('fs');

var res = [ 
    { 
        folder_id: 'cluster0', 
        name: 'cluster0', 
        images: ['https://s3.amazonaws.com/finddistinctpeoplevideo-s3bucket-1qk0wkjv5fx/supervised_training/0_10.png'] 
    },
    { 
        folder_id: 'cluster1',
        name: 'cluster1',
        images:[ 
            'https://s3.amazonaws.com/finddistinctpeoplevideo-s3bucket-1qk0wkjv5fx/supervised_training/0_0.png' 
        ] 
    } 
]
var untagged;
fs.readFile('./untagged_values.json', {encoding: 'utf-8'}, function(err,data){
    if (err) {
        // fs.truncate('./untagged_values.json', 0, function(){console.log('done')})
        console.log(err)
    } else {
        untagged = JSON.parse(data);
        res.forEach((element, i) => {
            untagged.data.forEach((ele) => {
                if (element.folder_id == ele.name) {
                    if (element.images != 0) {
                        element.images.forEach((imagePath) => {
                            untagged.data.forEach((obj) => {
                                obj.images.forEach((img, i1) => {
                                    if (img == imagePath) {
                                        obj.images.splice(i1, 1);
                                    }
                                })
                            })
                            ele.images.push(imagePath);
                        })
                    }
                }
            })
            if (res.length == i +1) {
                console.log(JSON.stringify(untagged));
            }
        })
    }
})



