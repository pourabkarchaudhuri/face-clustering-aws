$.ajax({
    type: "GET",
    url: "http://localhost:5000/getAllClusterVideos",
    async: false,

    success: function(response){
        if (response.status == 200) {
            $('#no-data-alert').hide();
            $('#main-container-payload').show();
            var outerDiv = document.createElement('div');
            outerDiv.className = 'video-albums row';
            document.getElementById('main-container-payload').appendChild(outerDiv);
            response.result.forEach((element, i) => {

                var innerDiv = document.createElement('div');
                innerDiv.className = 'video-container';

                outerDiv.appendChild(innerDiv);

                var videoElement = document.createElement('video');
                videoElement.id = 'video' + i;
                videoElement.className = 'video-js';
                videoElement.setAttribute('controls', 'true');
                videoElement.setAttribute('preload', 'none');
                videoElement.setAttribute('data-setup', '{}');
                videoElement.setAttribute('width', '320');
                videoElement.setAttribute('height', '240');

                innerDiv.appendChild(videoElement);

                var sourceElement = document.createElement('source');

                sourceElement.setAttribute('src', element.videoURL);
                sourceElement.setAttribute('type', 'video/mp4');

                videoElement.appendChild(sourceElement);

                var outerButtonDiv = document.createElement('div');
                outerButtonDiv.className = 'badge-class pull-right';

                innerDiv.appendChild(outerButtonDiv);

                var buttonElement = document.createElement('button');
                buttonElement.id = 'tag-btn' + i;
                buttonElement.className = 'btn pmd-ripple-effect btn-danger pmd-z-depth pmd-alert-toggle tag-btn';
                buttonElement.setAttribute('type', 'button');
                buttonElement.setAttribute('onclick', `window.location.href='http://localhost:5000/cluster?video=${element.videoName}'`);
                buttonElement.setAttribute('data-toggle', 'tooltip');
                buttonElement.setAttribute('data-placement', 'bottom');
                buttonElement.setAttribute('title', 'Tag Photos');


                outerButtonDiv.appendChild(buttonElement);

                var iconElement = document.createElement('i');
                iconElement.className = 'fas fa-tags';

                buttonElement.appendChild(iconElement);

                var videoTitleDiv = document.createElement('div');
                videoTitleDiv.className = 'video-label';

                innerDiv.appendChild(videoTitleDiv);

                var dateModifiedDiv = document.createElement('div');
                dateModifiedDiv.className = 'video-timestamp';

                innerDiv.appendChild(dateModifiedDiv);

                videoTitleDiv.innerHTML = element.videoName;
                dateModifiedDiv.innerHTML = element.dateModified;

            })

        } else {
            $('#no-data-alert').show();
            $('#main-container-payload').hide();
        }
    }
})