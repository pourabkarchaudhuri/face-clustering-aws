'use strict';

$(function () {
//On Page load behavior
// $('#no-data-alert').hide();
$(".mainContainer").mCustomScrollbar({
    axis:"x" // vertical and horizontal scrollbar
});
    //on Click web module button
    //on click submit on web module form
    // $('#submit-btn-id').on('click', function () {
    //     sendMessage();
    // });

});//end of document ready

function loopNext(){
    $('#mainContainer').stop().animate({scrollLeft:'+=20'}, 'fast', 'linear', loopNext);
}

function loopPrev(){
    $('#mainContainer').stop().animate({scrollLeft:'-=20'}, 'fast', 'linear', loopPrev);
}

function stop(){
    $('#mainContainer').stop();
}


$('#next').hover(function () {
   loopNext();
},function () {
   stop();
});

$('#prev').hover(function () {
   loopPrev();
},function () {
   stop();
});

//web scraper api call
function sendMessage(){

  var target = $('#submit-btn-id');
  target.attr('data-og-text', target.html()).html("Training : <i class='fa fa-cog fa-spin'></i>");
  $.ajax({  
    type: "POST",
    crossDomain: true,
    url: "https://rzxagt9l02.execute-api.us-east-1.amazonaws.com/v1/train",

    data: {
    	"path":"training/7d6299ec-a52f-11e8-aa06-b165aac03de1.jpg",
    	"empId":"36023",
    	"gallery": "tempid-cto-org-dev"
    },
    success: function(response){
      // console.log(response);
      if(response.status==200){
      target.html(target.attr('data-og-text'));
        alert("Success");
      }
      else{
        alert("Error")
      }
    },
    dataType: "JSON"
    });

}
//text scraper api call
