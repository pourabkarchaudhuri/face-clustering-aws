'use strict';

$(function () {
//On Page load behavior
    $("#web-summarizer-form").hide();
    $("#warning-wrapper").hide();
    $("#resultRow").hide();
    $("#resultDetails").hide()
    $("#alert-wrapper").hide();
    $("#text-summarizer-form").hide();
    $("#file-summarizer-form").hide();

    //on Click web module button
    $('#web-summarizer-btn').on('click', function () {
      $("#alert-wrapper").hide();
      $("#warning-wrapper").hide();
      $("#text-summarizer-form").hide();
      $("#file-summarizer-form").hide();
      $("#web-summarizer-form").show()
    });
    //on click submit on web module form
    $('#submit-btn-id').on('click', function () {
        sendMessage();
    });
    //on enter hit on submit on web module form
    $("#textfield").keypress(function (e) {
      if (e.which == 13) {
          if($.trim($(this).val())!=""){
            sendMessage();
          }
      }
    });
    //on Click text module button
    $('#text-summarizer-btn').on('click', function () {
      $("#alert-wrapper").hide();
      $("#warning-wrapper").hide();
      $("#web-summarizer-form").hide();
      $("#file-summarizer-form").hide();
      $("#text-summarizer-form").show()
    });

    //on click submit on text module form
    $('#submit-btn-id-text').on('click', function () {
        sendText();
    });

    //on enter hit on submit on text module form
    $("#textarea-txt").keypress(function (e) {
        if (e.which == 13) {
            if($.trim($(this).val())!=""){
              sendText();
            }
        }
    });

    //on Click Doc module button
    $('#file-summarizer-btn').on('click', function () {
      $("#alert-wrapper").hide();
      $("#warning-wrapper").hide();
      $("#text-summarizer-form").hide();
      $("#web-summarizer-form").hide();
      $("#file-summarizer-form").show();
    });

});//end of document ready

//web scraper api call
function sendMessage(){
  var url = $('#textfield').val();

  if(url==null||url==undefined||url==""){

    $("#resultRow").hide();
    $("#resultDetails").hide();
    $("#warning-message").html("Place an URL in the text field to begin summarization.");
    $("#warning-wrapper").show();
    $("#textfield").val("");
  }
  else{
  var target = $('#submit-btn-id');
  target.attr('data-og-text', target.html()).html("<i class='fa fa-cog fa-spin'></i>");
  $.ajax({
    type: "POST",
    //url: "http://localhost:5000/api/scraper",
    url: "https://peaceful-brushlands-95589.herokuapp.com/api/scraper",
    data: {url: url},
    success: function(response){
      // console.log(response);
      if(response.error_status==false){
      target.html(target.attr('data-og-text'));
      $("#word-counter").html(response.words);
      $("#alert-wrapper").hide();
      $("#warning-wrapper").hide();
        // $("#word-counter").focus();
      $("#compression").html(response.compression);
      $("#result-title").html(response.title);
      $("#result").html(response.summary);
      $("#resultRow").show();
      $("#resultDetails").show();
      $("#textfield").val("");
      }
      else{
        target.html(target.attr('data-og-text'));
        $("#warning-wrapper").hide();
        $("#resultRow").hide();
        $("#resultDetails").hide();
        $("#alert-message").html(response.error);
        $("#alert-wrapper").show();
        $("#textfield").val("");
      }
    },
    dataType: "JSON"
    });
  }
}
//text scraper api call
function sendText(){

  var text = $('#textarea-txt').val();

  if(text==null||text==undefined||text==""){

    //$("#resultRow").hide();
  //  $("#resultDetails").hide();
    $("#warning-message").html("Place some in the text field to begin summarization.");
    $("#warning-wrapper").show();
    $("#textarea-txt").val("");
  }
  else{
  var target = $('#submit-btn-id-text');
  target.attr('data-og-text', target.html()).html("<i class='fa fa-cog fa-spin'></i>");
  $.ajax({
    type: "POST",
    //url: "http://localhost:5000/api/parser",
    url: "https://peaceful-brushlands-95589.herokuapp.com/api/parser",
    data: {text: text},
    success: function(response){
      // console.log(response);
      if(response.error_status==false){
      target.html(target.attr('data-og-text'));
      $("#word-counter").html(response.words);
      $("#alert-wrapper").hide();
      $("#warning-wrapper").hide();
        // $("#word-counter").focus();
      $("#compression").html(response.compression);
      $("#result-title").html("");
      $("#result").html(response.summary);
      $("#resultRow").show();
      $("#resultDetails").show();
      $("#textarea-txt").val("");
      }
      else{
        target.html(target.attr('data-og-text'));
        $("#warning-wrapper").hide();
        $("#resultRow").hide();
        $("#resultDetails").hide();
        $("#alert-message").html(response.error);
        $("#alert-wrapper").show();
        $("#textarea-txt").val("");
      }
    },
    dataType: "JSON"
    });
  }
}

function upload() {

  var fd = new FormData(),
      myFile = document.getElementById("file").files[0];

  fd.append( 'file',  myFile);
  var target = $('#file-upload-btn');
  target.attr('data-og-text', target.html()).html("<i class='fa fa-cog fa-spin'></i>");
  $.ajax({
    //url: 'http://localhost:5000/api/upload',
    url: "https://peaceful-brushlands-95589.herokuapp.com/api/upload",
    data: fd,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(response){
      console.log(response);
      if(response.error_status==false){
      target.html(target.attr('data-og-text'));
      $("#file").val('')
      $("#word-counter").html(response.words);
      $("#alert-wrapper").hide();
      $("#warning-wrapper").hide();
        // $("#word-counter").focus();
      $("#compression").html(response.compression);
      $("#result-title").html("");
      $("#result").html(response.summary);
      $("#resultRow").show();
      $("#resultDetails").show();

      }
      else{
        target.html(target.attr('data-og-text'));
        $("#warning-wrapper").hide();
        $("#resultRow").hide();
        $("#resultDetails").hide();
        $("#alert-message").html(response.error);
        $("#alert-wrapper").show();

      }
    }
  });
}
