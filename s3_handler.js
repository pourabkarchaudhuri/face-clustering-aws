var s3Handlers = require('./s3');

 

//THIS IS LIST OBJECT HANDLER

 

// s3Handlers.GetObjectsFromBucket((err, results)=>{

//   if(err){

//     console.log("Error fetching S3 Object list");

//

//   }

//   else{

//     console.log("Success in fetching data from S3")

//   }

// })

 

 

//THIS IS RENAME OBJECT HANDLER (COPY + DELETE)



s3Handlers.CopyObject((err, results, oldUrl)=>{

  if(err){

     console.log("Error Copying S3 Object");

   }

   else{

     console.log("Success in copying S3 Object")

     console.log("Time to delete Old URL : " + oldUrl);

     s3Handlers.DeleteObject(oldUrl, (err, results)=>{



         if(err){

           console.log("Error Deleting S3 Object");



         }

         else{

           console.log("Success in deleting data from S3")

         }



     })

   }

})