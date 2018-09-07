

// Getting element from ID.
function _(id){
    return document.getElementById(id);
}


function getQueryString() {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;
    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
}

var myParam = getQueryString()["video"];
if (myParam) {
    $.ajax({
        type: "GET",
        url: env.SERVER_URL + ":" + env.PORT + "/getImages?video=" + myParam,
        async: false,

        success: function(response){
            if (response.status == 400) {
                $('#no-data-alert').show();

            } else {
                $('#main-container-payload').show();
            var imgCount = 0;
            response.results.forEach(function(obj, i) {

                //Creating drop zone for each cluster.
                var subDiv = document.createElement('div');
                subDiv.className = "subClass";
                subDiv.setAttribute('badge-edit', obj.name + i);
                subDiv.setAttribute('id-att', obj.name);

                document.getElementById('drop_zones').appendChild(subDiv);

                var dz_div = document.createElement('div');
                var id_div = obj.name;
                dz_div.id = id_div;
                dz_div.className = 'album';
                dz_div.setAttribute('droppable', 'true')
                dz_div.setAttribute('ondragenter', 'drag_enter(event)');
                dz_div.setAttribute('ondrop', 'drag_drop(event)');
                dz_div.setAttribute('ondragover', 'return false');
                dz_div.setAttribute('ondragleave', 'drag_leave(event)');

                var imgInnerElement = document.createElement('img');
                imgInnerElement.id = obj.name;
                imgInnerElement.className = 'divimg btn';
                imgInnerElement.setAttribute('src', obj.images[0]);
                imgInnerElement.setAttribute('onclick', "filterSelection('"+obj.name+"')")

                imgInnerElement.setAttribute('data-toggle', 'tooltip');
                imgInnerElement.setAttribute('data-placement', 'top');
                imgInnerElement.setAttribute('title', 'Click to Filter');
                imgInnerElement.setAttribute('draggable', 'false');

                var inputElement = document.createElement('input');
                inputElement.setAttribute('type', 'text');
                inputElement.setAttribute('required', 'true');
                inputElement.id = obj.name;
                inputElement.className = 'input-class';
                inputElement.style.textAlign = "center";
                inputElement.setAttribute('spellcheck','false');
                inputElement.placeholder = obj.name;
                inputElement.name = obj.name;
                subDiv.appendChild(dz_div);
                document.getElementById(id_div).appendChild(imgInnerElement);
                subDiv.appendChild(inputElement);

                var badgeDiv = document.createElement('div');
                badgeDiv.setAttribute('data-badge', obj.images.length);
                badgeDiv.className = "material-icons pmd-md pmd-badge pmd-badge-overlap badge-postition";
                badgeDiv.id = 'badge';
                dz_div.appendChild(badgeDiv)

                // Adding delete cluster button.
                var closeButton = document.createElement('button');
                closeButton.id = obj.name;
                closeButton.className = 'close_btn  pmd-ripple-effect pmd-z-depth';
                // Adding modal atrributes.
                closeButton.setAttribute('data-target', '#alert-dialog');
                closeButton.setAttribute('data-toggle', 'modal');

                closeButton.setAttribute('id-att', obj.name);
                closeButton.setAttribute('data-positionX', 'right');
                closeButton.setAttribute('data-positionY', 'top');
                closeButton.setAttribute('data-duration', '10000');
                closeButton.setAttribute('data-effect', 'fadeInUp');
                closeButton.setAttribute('data-type', 'warning');
                closeButton.setAttribute('onclick', `deleteDropZone('${obj.name}', event)`);
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                dz_div.appendChild(closeButton);

                obj.images.forEach(function(obj2, i1){
                    var img1 = document.createElement('img');
                    img1.setAttribute('src', obj2);
                    img1.setAttribute('width', '75px');
                    img1.id = obj.name + i1;
                    img1.className = "objects column cover-item " + obj.name;
                    img1.setAttribute("path", obj.name);
                    img1.setAttribute('badge-edit', obj.name + i);
                    img1.setAttribute('ondragstart', 'drag_start(event)');
                    img1.setAttribute('ondragend', 'drag_end(event)');
                    document.getElementById('main').appendChild(img1);
                })

                imgCount += obj.images.length
            })

            document.getElementById('main').style.width =  imgCount * 110 +"px";
            clusterImageArray = [];
            for(var i=0; i < _("drop_zones").children.length; i++) {
                var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
                var element = _("drop_zones").children[i];
                var childDiv = element.getElementsByTagName('div')[0];
                var requiredImg = childDiv.getElementsByTagName('img')[0];
                clusterImageArray.push(requiredImg.src.replace(env.BUCKET_URL, ''));

                if (_("drop_zones").children.length == (i + 1)) {
                    $.ajax({
                        type: "POST",
                        url: env.SERVER_URL + ":" + env.PORT + "/getPlaceholder",
                        async: false,
                        data: {clusterImageArray},
                    
                        success: function(response){
                            response.forEach((ele, i) => {
                                for(var i=0; i < _("drop_zones").children.length; i++) {
                                    var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
                                    var element = _("drop_zones").children[i];
                                    var childInput = element.getElementsByTagName('input')[0];
                                    var childDiv = element.getElementsByTagName('div')[0];
                                    var requiredImg = childDiv.getElementsByTagName('img')[0];
                                    if (ele.images == requiredImg.src.replace(env.BUCKET_URL, '')) {
                                        if (ele.name ) {
                                            if (!ele.name.code) {
                                                childInput.value = ele.name.replace(/_/g, " ");
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
            }
        }

        },
        dataType: "JSON"
    });
}
