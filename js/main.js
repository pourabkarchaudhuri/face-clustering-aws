// Default selection panel
filterSelection("all")

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Getting element from ID.
function _(id){
    return document.getElementById(id);
}

var droppedIn = false;
function drag_start(event) {
    _('app_status').innerHTML = "Dragging the "+event.target.getAttribute('id');
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );
}

function drag_enter(event) {
    _('app_status').innerHTML = "You are dragging over the "+event.target.getAttribute('id');
}

function drag_leave(event) {
    _('app_status').innerHTML = "You left the "+event.target.getAttribute('id');
}

function drag_drop(event) {
    event.preventDefault(); /* Prevent undesirable default behavior while dropping */
    var elem_id = event.dataTransfer.getData("text");
    // event.target.appendChild( _(elem_id) );
    // console.log(_(elem_id).getAttribute('path'));
    if (_(elem_id).getAttribute('path') == event.target.getAttribute('id')) {
        console.log("Same Cluster");
    } else {
        _(elem_id).classList.remove(_(elem_id).getAttribute('path'));
        _(elem_id).classList.add(event.target.getAttribute('id'));
        _(elem_id).removeAttribute('path');
        _(elem_id).setAttribute('path', event.target.getAttribute('id'));
        _(elem_id).classList.remove('show');
        var childs = _(event.target.getAttribute('id')).childNodes;
        // console.log(firstChild);
        // childs.forEach((element) => {
        //     console.log(element.id);
        //     if (element.id == 'badge') {
        //         var value = parseInt(element.getAttribute('data-badge'));
        //         element.setAttribute('data-badge', value + 1);
        //         var oldElementId = _(elem_id).getAttribute('path');
        //         for(var i=0; i < _("drop_zones").children.length; i++) {
        //             var element1 = _("drop_zones").children[i];
        //             if (element1.getAttribute('badge-edit') == _(elem_id).getAttribute('badge-edit')) {
        //                 console.log(element1);
        //                 _(elem_id).setAttribute('badge-edit', elem_id);
        //                 var childDiv = element1.getElementsByTagName('div')[0];
        //                 var requiredDiv = childDiv.getElementsByTagName('div')[0];
        //                 var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
        //                 requiredDiv.setAttribute('data-badge', value2 - 1);
    
        //             }
                    
        //         }

        //     }
        // })
        var data = [];
        var images = [];
        var name = null;
        var c = 0;
        for(var i=0; i < _("drop_zones").children.length; i++) {
            var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
            // var path = _(element_id).getAttribute('path');
            var element = _("drop_zones").children[i]
            // console.log(element_id_att);
            // name = element_id_att;
            $('img[path="'+element_id_att +'"]').each(function(i, el) {
                c++;
            });
            var childDiv = element.getElementsByTagName('div')[0];
            var requiredDiv = childDiv.getElementsByTagName('div')[0];
            console.log(requiredDiv);
            var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
            requiredDiv.setAttribute('data-badge', c);
            c = 0;
        }

        


    }
    _('app_status').innerHTML = "Dropped "+elem_id+" into the "+event.target.getAttribute('id');
    //  _(elem_id).removeAttribute("draggable");
    // _(elem_id).classList.remove('column');
    // _(elem_id).style.height = '50px';
    // _(elem_id).style.width = '50px';
    // _(elem_id).style.borderRadius = '50%';
    // _(elem_id).style.cursor = "default";
    droppedIn = true;
}

function drag_end(event) {
    if(droppedIn == false){
        _('app_status').innerHTML = "You let the "+event.target.getAttribute('id')+" go.";
    }
    droppedIn = false;
}

// Reading the dropzone and make changes to backend.
function readDropZone() {
    // var data = [];
    // var images = [];
    // var name;
    // var element_id;
    // for(var i=0; i < _("drop_zones").children.length; i++) {
    //     name = null;
    //     images = [];
    //     var element_id = _("drop_zones").children[i].id
    //     for (var j = 0; j<_(element_id).children.length; j++) {
    //         var elements = _(element_id).children[j];
    //         if(elements.innerHTML) {
    //             console.log(elements.innerHTML);
    //             element_id = elements.id;
    //             name = elements.innerHTML;
    //         } else {
    //             // alert(_(element_id).children[j].src);
    //             images.push(_(element_id).children[j].src);
    //         }
    //     }
    //     data.push({
    //         'folder_id': element_id,
    //         'name': name,
    //         'images': images.length > 0 ? images : ''
    //     })
    // }
    // if (_("drop_zones").children.length == data.length) {
    //     $.ajax({
    //         type: "POST",
    //         url: "http://localhost:5000/tagData",
    //         async: false,
    //         data: {data},
    //         success: function(response){
    //             console.log(response);
    //             if (response == 'successful') {
    //                 location.href = "./success.html"
    //             }
    //         }
    //     });
    // }
    var data = [];
    var images = [];
    var name = null;
    console.log("inside");
    // for(var i=0; i < _("drop_zones").children.length; i++) {
    //     var element_id = _("drop_zones").children[i].id;
    //     // var path = _(element_id).getAttribute('path');
    //     // console.log(element_id);
    //     name = element_id;
    //     $('img[path="'+element_id +'"]').each(function(i, el) {
    //         console.log(el.getAttribute('path'));
    //         if (el.getAttribute('path') == element_id) {
    //             images.push(el.src);
    //         }
    //     });
    //     data.push({
    //         "name": name,
    //         "images": images
    //     })
    //     images = [];

    //     if(_("drop_zones").children.length == i + 1) {
    //         console.log(JSON.stringify(data));
    //     }
    // }

    var data = [];
    var images = [];
    var name = null;
    var c = 0;
    for(var i=0; i < _("drop_zones").children.length; i++) {
        var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
        // var path = _(element_id).getAttribute('path');
        var element = _("drop_zones").children[i]
        // console.log(element_id_att);
        // name = element_id_att;
        $('img[path="'+element_id_att +'"]').each(function(i, el) {
            images.push(el.src);
        });
        // var childDiv = element.getElementsByTagName('div')[0];
        // var requiredDiv = childDiv.getElementsByTagName('div')[0];
        // console.log(requiredDiv);
        // var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
        // requiredDiv.setAttribute('data-badge', c);
        // c = 0;
        console.log(images);
        images = [];
    }
    // for(var i=0; i < _("main").children.length; i++) {
    //     var id = _("main").children[i].id;
    //     _(id).getAttribute('path');
    // }


}
