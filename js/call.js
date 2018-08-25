
$.ajax({
    type: "GET",
    url: "http://localhost:5000/getImages",
    async: false,

    success: function(response){
        // var btn = document.createElement('BUTTON');
        // btn.setAttribute('class', 'btn active');
        // btn.setAttribute('onclick', "filterSelection('all')")
        // btn.innerHTML = 'ALL';
        // document.getElementById('myBtnContainer').appendChild(btn);

        var imgCount = 0;
        response.results.forEach(function(obj, i) {
            // var btn = document.createElement('BUTTON');
            // btn.setAttribute('onclick', "filterSelection('"+obj.name+"')")
            // var btn_id = "btn_" + obj.name;
            // btn.id = btn_id;
            // btn.innerHTML = obj.name;
            // btn.setAttribute('class', 'btn');
            // document.getElementById('myBtnContainer').appendChild(btn);

            //Creating drop zone for each cluster.
            var subDiv = document.createElement('div');
            // var span = document.createElement('span');
            // var subDivId = 'subId' + i;
            // subDiv.id = subDivId;
            subDiv.className = "subClass";
            subDiv.setAttribute('badge-edit', obj.name + i);
            subDiv.setAttribute('id-att', obj.name);

            // subDiv.setAttribute('draggable', 'false');

            document.getElementById('drop_zones').appendChild(subDiv);
            // subDiv.style.border = '1px solid red';

            var dz_div = document.createElement('div');
            var id_div = obj.name;
            dz_div.id = id_div;
            dz_div.className = 'album';
            // dz_div.setAttribute('contenteditable', 'true');
            dz_div.setAttribute('droppable', 'true')
            dz_div.setAttribute('ondragenter', 'drag_enter(event)');
            dz_div.setAttribute('ondrop', 'drag_drop(event)');
            dz_div.setAttribute('ondragover', 'return false');
            dz_div.setAttribute('ondragleave', 'drag_leave(event)');
            // var innerDiv = document.getElementById(subDivId);
            // console.log(innerDiv);
            // document.getElementById(subDivId).appendChild(dz_div);
            // document.getElementById('drop_zones').appendChild(dz_div);
            // document.getElementById(id_div).style.backgroundImage = 'url(' + obj.images[0] + ')';

            var imgInnerElement = document.createElement('img');
            imgInnerElement.id = obj.name;
            imgInnerElement.className = 'divimg btn';
            imgInnerElement.setAttribute('src', obj.images[0]);
            imgInnerElement.setAttribute('onclick', "filterSelection('"+obj.name+"')")

            imgInnerElement.setAttribute('data-toggle', 'tooltip');
            imgInnerElement.setAttribute('data-placement', 'top');
            imgInnerElement.setAttribute('title', 'Click to Filter');
            imgInnerElement.setAttribute('draggable', 'false');

            // var btn_id = "btn_" + obj.name;
            // btn.id = btn_id;
            // btn.innerHTML = obj.name;
            // btn.setAttribute('class', 'btn');
            // document.getElementById('myBtnContainer').appendChild(btn);

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

            // var innerDiv = document.createElement('input');
            subDiv.appendChild(inputElement);
            // subDiv.appendChild(inputElement);

            var badgeDiv = document.createElement('div');
            badgeDiv.setAttribute('data-badge', obj.images.length);
            badgeDiv.className = "material-icons pmd-md pmd-badge pmd-badge-overlap badge-postition";
            badgeDiv.id = 'badge';
            dz_div.appendChild(badgeDiv)






            // var cName = document.createElement('h6');
            // cName.id = obj.name;
            // cName.innerHTML = obj.name;
            // document.getElementById(id_div).appendChild(cName);
            // var inputElement = document.createElement('input');


            obj.images.forEach(function(obj2, i1){
                var img1 = document.createElement('img');
                img1.setAttribute('src', obj2);
                img1.setAttribute('width', '75px');
                img1.id = obj.name + i1;
                img1.className = "objects column cover-item " + obj.name;
                img1.setAttribute("path", obj.name  );
                img1.setAttribute('badge-edit', obj.name + i);

                // img1.setAttribute('draggable', 'false');
                //data-toggle="tooltip" data-placement="top" title="Resets people groups"
                img1.setAttribute('ondragstart', 'drag_start(event)');
                img1.setAttribute('ondragend', 'drag_end(event)');
                document.getElementById('main').appendChild(img1);
            })

            imgCount += obj.images.length
        })

        document.getElementById('main').style.width =  imgCount * 110 +"px";


    },
    dataType: "JSON"
});
