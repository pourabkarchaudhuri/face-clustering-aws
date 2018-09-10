// Default selection panel
filterSelection("all");

function filterSelection(c) {
    for(var i=0; i < _("drop_zones").children.length; i++) {
        var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
        var element = _("drop_zones").children[i];
        var childDiv = element.getElementsByTagName('div')[0];
        if (element_id_att == c) {
            childDiv.style.border = '3px solid #02578c';
        } else {
            childDiv.style.border = '3px dashed #ccc';
        }
    }

    for(var i=0; i < _("delete").children.length; i++) {
        var element_id_att = _("delete").children[i].getAttribute('id-att');
        var element = _("delete").children[i];
        var childDiv = element.getElementsByTagName('div')[0];
        if (element_id_att == c) {
            childDiv.style.border = '3px solid #df0024';
        } else {
            childDiv.style.border = '3px dashed #ccc';
        }
    }
  var x, i, count = 0;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (new RegExp( '\\b' + c + '\\b', 'i').test(x[i].className)) {
        w3AddClass(x[i], "show");
        count++
    }
    if (x.length == i + 1) {
        document.getElementById('main').style.width =  count * 110 + "px";
        if (document.getElementsByClassName('mCSB_container')[0]) {
            document.getElementsByClassName('mCSB_container')[0].style.width =  count * 110 + "px";
        }
    }
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
// var btnContainer = document.getElementById("myBtnContainer");
// var btns = btnContainer.getElementsByClassName("btn");
// for (var i = 0; i < btns.length; i++) {
//     btns[i].addEventListener("click", function(){
//         var current = document.getElementsByClassName("active");
//         current[0].className = current[0].className.replace(" active", "");
//         this.className += " active";
//     });
// }

// Getting element from ID.
function _(id){
    return document.getElementById(id);
}

var droppedIn = false;
function drag_start(event) {
    // _('app_status').innerHTML = "Dragging the "+event.target.getAttribute('id');
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );
}

function drag_enter(event) {
    // _('app_status').innerHTML = "You are dragging over the "+event.target.getAttribute('id');
}

function drag_leave(event) {
    // _('app_status').innerHTML = "You left the "+event.target.getAttribute('id');
}

function drag_drop(event) {
    event.preventDefault(); /* Prevent undesirable default behavior while dropping */
    var elem_id = event.dataTransfer.getData("text");
    if (event.target.getAttribute('id') == 'delete-area') {
        _(elem_id).classList.remove(_(elem_id).getAttribute('path'));
        _(elem_id).classList.add(event.target.getAttribute('id'));
        _(elem_id).removeAttribute('path');
        _(elem_id).setAttribute('path', event.target.getAttribute('id'));
        _(elem_id).classList.remove('show');

        var data = [];
        var images = [];
        var name = null;
        var c = 0;
        for(var i=0; i < _("drop_zones").children.length; i++) {
            var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
            var element = _("drop_zones").children[i];
            $('img[path="'+element_id_att +'"]').each(function(i, el) {
                c++;
            });
            var childDiv = element.getElementsByTagName('div')[0];
            var requiredDiv = childDiv.getElementsByTagName('div')[0];
            var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
            requiredDiv.setAttribute('data-badge', c);
            c = 0;
        }

        for(var i=0; i < _("delete").children.length; i++) {
            c = 0;
            var element_id_att = _("delete").children[i].getAttribute('id-att');
            var element = _("delete").children[i];
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
    } else if (_(elem_id).getAttribute('path') == event.target.getAttribute('id')) {
        console.log("Same Cluster");
    } else {
        _(elem_id).classList.remove(_(elem_id).getAttribute('path'));
        _(elem_id).classList.add(event.target.getAttribute('id'));
        _(elem_id).removeAttribute('path');
        _(elem_id).setAttribute('path', event.target.getAttribute('id'));
        _(elem_id).classList.remove('show');

        var data = [];
        var images = [];
        var name = null;
        var c = 0;
        for(var i=0; i < _("drop_zones").children.length; i++) {
            var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
            var element = _("drop_zones").children[i]
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

        for(var i=0; i < _("delete").children.length; i++) {
            c = 0;
            var element_id_att = _("delete").children[i].getAttribute('id-att');
            var element = _("delete").children[i]
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
    droppedIn = true;

    for(var i=0; i < _("drop_zones").children.length; i++) {
        var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
        var element = _("drop_zones").children[i]
        $('img[path="'+element_id_att +'"]').each(function(i, el) {
            if (i == 0) {
                var childDiv = element.getElementsByTagName('div')[0];
                var requiredDiv = childDiv.getElementsByTagName('img')[0];
                requiredDiv.src = el.src;
            }
        });
    }
}

function drag_end(event) {
    if(droppedIn == false){
        // _('app_status').innerHTML = "You let the "+event.target.getAttribute('id')+" go.";
    }
    droppedIn = false;
}

// Reading the dropzone and make changes to backend.
function readDropZone(event) {
    var target = $('#submit-btn-id');
    var t = document.getElementById('submit-btn-id');
    target.attr('data-og-text', target.html()).html("Training : <i class='fa fa-cog fa-spin'></i>");
    var data = [];
    var images = [];
    var name = null;
    var c = 0;
    var textValueFlag = false;
    for(var i=0; i < _("drop_zones").children.length; i++) {
        var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
        var element = _("drop_zones").children[i];
        $('img[path="'+element_id_att +'"]').each(function(i, el) {
            images.push(el.src.replace(env.BUCKET_URL, ''));
        });
        var childDiv = element.getElementsByTagName('input')[0];
        var numPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
        if (childDiv.value) {
            if (!numPattern.test(childDiv.value)) {
                //Storing the new tagged value and making JSON.
                name = childDiv.value.replace(/ /g, "_");
            } else {
                event.target.setAttribute('data-message', "No special characters or numbers other than alphabets are allowed");
                event.target.setAttribute('data-type', 'warning');
                target.attr('data-og-text', target.html()).html("SAVE AND TRAIN");
                return false;
            }
        } else {
            textValueFlag = true;
            console.log("inside");
        }
        data.push({
            "name": name,
            "images": images
        })
        images = [];
        if( _("drop_zones").children.length == i + 1) {
            if (textValueFlag) {
                event.target.setAttribute('data-message', "All the people are still not renamed.");
                target.attr('data-og-text', target.html()).html("SAVE AND TRAIN");
                return false;
            } else {

                // Training
                console.log("Before AJAX : ");
                event.target.setAttribute('data-message', "Training");
                event.target.setAttribute('data-type', 'success');
                $.ajax({
                    type: "POST",
                    url: env.SERVER_URL + ":" + env.PORT + "/tagData",
                    async: false,
                    data: {data},
                
                    success: function(response){
                        console.log("Response : " + JSON.stringify(response));
                        if(response.status == 200){
                            event.target.setAttribute('data-message', "Data trained successfully, you will get a notification.");
                            event.target.setAttribute('data-type', 'success');
                            setTimeout(() => {
                                target.attr('data-og-text', target.html()).html("Trained");
                            }, 1000)

                            setTimeout(() => {
                                document.getElementById('no-data-alert').innerHTML = 'The images you tagged are successfully trained. These people will be recognised by the names you have given.';
                                $('#no-data-alert').show();
                                $('#main-container-payload').hide();
                            }, 1500);
                        }
                        else {
                            target.attr('data-message', "Error training, please try again later.");
                            target.attr('data-type', 'error');
                            setTimeout(() => {
                                target.attr('data-og-text', target.html()).html("SAVE AND TRAIN");
                            }, 1000);
                        }

                    },
                    dataType: "JSON"
                });
                
            }
        }
    }
}

function deleteObjects(event) {
    var images = [];
    var target = $('#del-btn');
    target.attr('data-message', "Deleting image(s).");
    target.attr('data-type', 'information');
    target.attr('data-og-text', target.html()).html("<i class='fa fa-cog fa-spin'></i>");
    for(var i=0; i < _("delete").children.length; i++) {
        c = 0;
        var element_id_att = _("delete").children[i].getAttribute('id-att');
        var element = _("delete").children[i]
        $('img[path="'+element_id_att +'"]').each(function(i, el) {
        
            let key = el.src.replace(env.BUCKET_URL, '');
            images.push({
                Key: key
            });
        });
        if (_("delete").children.length == i + 1) {
            
            $.ajax({
                type: "POST",
                url: env.SERVER_URL + ":" + env.PORT + "/deleteObjects",
                async: false,
                data:{images},
                success: function(response){
                    if (response.status == 200) {
                        updateClusterAndFacesCount();
                        setTimeout(() => {
                            var target = $('#del-btn');
                            target.attr('data-og-text', target.html()).html("<i class='fas fa-broom'></i>");
                        }, 2000);
                        target.attr('data-message', "Image(s) deleted successfully");
                        target.attr('data-type', 'information');                      
                        // target.html(target.attr('data-og-text'));
                        for(var i=0; i < _("delete").children.length; i++) {
                            updateClusterAndFacesCount();
                            c = 0;
                            var element_id_att = _("delete").children[i].getAttribute('id-att');
                            var element = _("delete").children[i]
                            $('img[path="'+element_id_att +'"]').each(function(i, el) {
                                $(el).remove();
                            });
                            var childDiv = element.getElementsByTagName('div')[0];
                            var requiredDiv = childDiv.getElementsByTagName('div')[0];
                            var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
                            requiredDiv.setAttribute('data-badge', c);
                            c = 0;
                        }

                    } else if (response.status == 400){
                        console.log("error")
                    } else if (response.status == 415) {
                        target.attr('data-message', "There are no images in the bin to delete.");
                        target.attr('data-type', 'warning');
                        setTimeout(() =>{
                            target.attr('data-og-text', target.html()).html("<i class='fas fa-broom'></i>");
                        }, 1000)
                    }
                },
                dataType: "JSON"
            })
        }
    }
    updateClusterAndFacesCount();
}

function addDropZones() {
    var subDiv = document.createElement('div');
    subDiv.className = "subClass";
    subDiv.setAttribute('badge-edit', "Person-" + (_("drop_zones").children.length + 1));
    subDiv.setAttribute('id-att', "Person-" + (_("drop_zones").children.length + 1));

    document.getElementById('drop_zones').appendChild(subDiv);

    var dz_div = document.createElement('div');
    var id_div = "Person-" + _("drop_zones").children.length;
    dz_div.id = id_div;
    dz_div.className = 'album';
    dz_div.setAttribute('droppable', 'true')
    dz_div.setAttribute('ondragenter', 'drag_enter(event)');
    dz_div.setAttribute('ondrop', 'drag_drop(event)');
    dz_div.setAttribute('ondragover', 'return false');
    dz_div.setAttribute('ondragleave', 'drag_leave(event)');

    var imgInnerElement = document.createElement('img');
    imgInnerElement.id = "Person-" + _("drop_zones").children.length;
    imgInnerElement.className = 'divimg btn';
    imgInnerElement.setAttribute('src', 'https://i.imgur.com/karbtGL.jpg');
    imgInnerElement.setAttribute('onclick', "filterSelection('" + `Person-` + _(`drop_zones`).children.length +"')");

    imgInnerElement.setAttribute('data-toggle', 'tooltip');
    imgInnerElement.setAttribute('data-placement', 'top');
    imgInnerElement.setAttribute('title', 'Click to Filter');
    imgInnerElement.setAttribute('draggable', 'false');

    var inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('required', 'true');
    inputElement.id = "Person-" + (_("drop_zones").children.length);
    inputElement.className = 'input-class';
    inputElement.style.textAlign = "center";
    inputElement.setAttribute('spellcheck','false');
    inputElement.placeholder = "Person-" + (_("drop_zones").children.length);
    inputElement.name = "Person-" + (_("drop_zones").children.length);
    subDiv.appendChild(dz_div);
    document.getElementById(id_div).appendChild(imgInnerElement);
    // document.getElementById(id_div).innerHTML = '<i class="fas fa-times"></i>';

    subDiv.appendChild(inputElement);

    var badgeDiv = document.createElement('div');
    badgeDiv.setAttribute('data-badge', 0);
    badgeDiv.className = "material-icons pmd-md pmd-badge pmd-badge-overlap badge-postition";
    badgeDiv.id = 'badge';
    dz_div.appendChild(badgeDiv);

    var closeButton = document.createElement('button');
    closeButton.id = "Person-" + _("drop_zones").children.length;

    // Adding modal attributes.
    closeButton.setAttribute('data-target', '#alert-dialog');
    closeButton.setAttribute('data-toggle', 'modal');

    closeButton.className = 'close_btn  pmd-ripple-effect pmd-z-depth';
    // closeButton.className = 'close_btn  pmd-ripple-effect pmd-z-depth pmd-alert-toggle';
    closeButton.setAttribute('id-att', "Person-" + _("drop_zones").children.length);
    closeButton.setAttribute('data-positionX', 'right');
    closeButton.setAttribute('data-positionY', 'top');
    closeButton.setAttribute('data-duration', '10000');
    closeButton.setAttribute('data-effect', 'fadeInUp');
    closeButton.setAttribute('data-type', 'warning');
    closeButton.setAttribute('onclick', `deleteDropZone('Person-${_("drop_zones").children.length}', event)`);
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    dz_div.appendChild(closeButton);

    updateClusterAndFacesCount();

}

var button;
var elementIdAtt;
var imagesToDelete;
function deleteDropZone(element, event) {
    updateClusterAndFacesCount();
    var images = [];
    for(var i=0; i < _("drop_zones").children.length; i++) {
        var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
        if (element == element_id_att) {
            elementIdAtt = element_id_att;
            var outerDiv = _("drop_zones").children[i];

            var childDiv = outerDiv.getElementsByTagName('div')[0];
            var requiredDiv = childDiv.getElementsByTagName('div')[0];
            
            var buttonElement = childDiv.getElementsByTagName('button')[0];
            
            buttonElement.className += ' pmd-alert-toggle';
            button = buttonElement;
            
            $('img[path="'+ elementIdAtt +'"]').each(function(i, el) {
                images.push({
                    Key: el.src.replace(env.BUCKET_URL, '')
                });
            });
            imagesToDelete = images;
            // buttonElement.setAttribute('data-message', "Please remove or delete image(s) from the cluster first to delete the cluster.");
            // buttonElement.setAttribute('data-type', 'warning');

        }
    }
    updateClusterAndFacesCount();
}

function confirmDeleteZone(event) {
    updateClusterAndFacesCount();
    var target = $('#confirmDelete');
    var images = [];
    
    setTimeout(() => {
        $('div[id-att="'+ button.id + '"]').remove();
    }, 0);

    $('img[path="'+ elementIdAtt +'"]').each(function(i, el) {
        images.push({
            Key: el.src.replace(env.BUCKET_URL, '')
        });
        $(el).remove();
    });
    
    target.attr('data-message', "Cluster is successfully deleted.");
    target.attr('data-type', 'success');
    if (images.length != 0) {
        $.ajax({
            type: "POST",
            url: env.SERVER_URL + ":" + env.PORT + "/deleteObjects",
            async: false,
            data:{images},
            success: function(response){
                if (response.status == 200) {
                    updateClusterAndFacesCount();                   
                    console.log("Images deleted")
                } else if (response.status == 400){
                    console.log("error")
                } else if (response.status == 415) {
                    console.log("error");
                }
            },
            dataType: "JSON"
        })
    }
    updateClusterAndFacesCount();
    //  else {
    //     target.attr('data-message', "Oh snap! There are no images in the cluster.");
    //     target.attr('data-type', 'error');
    // }
}

function discardDeleteZone(event) {
    updateClusterAndFacesCount();
    var target = $('#discardDelete');
    target.attr('data-message', "Changes saved.");
    target.attr('data-type', 'information');
}

var clustersToDelete;
var videoToDelete;
function deleteAllInitiated(event) {
    deleteClusters = [];
    deleteVideo = [];
    var myParam = getQueryString()["video"];
    deleteClusters.push({
        Key: 'supervised_training/' + myParam,
    })
    deleteVideo.push({
        Key: 'input/' + myParam
    })
    clustersToDelete = deleteClusters;
    videoToDelete = deleteVideo;
    
}


function confirmDeleteAllZone(event) {
    var target = $('#confirmDelete');
    $.ajax({
        type: "GET",
        url: env.SERVER_URL + ":" + env.PORT + "/deleteAll?clustersToDelete=" + JSON.stringify(clustersToDelete) + "&videoToDelete=" + JSON.stringify(videoToDelete),
        async: false,

        success: function(response) {
            if (response.status == 200) {
                $('#no-data-alert').show();
                $('#main-container-payload').hide();
                target.attr('data-message', "Cluster is successfully deleted.");
                target.attr('data-type', 'success');
                setTimeout(() => {
                    window.location.href = env.SERVER_URL + ":" + env.PORT;
                })
            } else if(response.status == 400) {
                window.location.href = env.SERVER_URL + ":" + env.PORT;
            }
        }
    })
}
function getQueryString() {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;
    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
}

function updateClusterAndFacesCount() {
    var clusterCounter = document.getElementById('cluster-counter');
    setTimeout(() => {
        clusterCounter.innerHTML = _("drop_zones").children.length + " ";
    }, 0);
    // var facesCounter = document.getElementById('faces-counter');
    // facesCounter.innerHTML = document.getElementsByTagName('img').length + ' ';
}

updateClusterAndFacesCount();