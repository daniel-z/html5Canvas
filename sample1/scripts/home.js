
// ---------------------------------------------------------------------------
// Js Code for Home Page
// ---------------------------------------------------------------------------

var
fpsInput = document.querySelector('input.fps'),
startButton = document.querySelector('input.start'),
stopButton = document.querySelector('input.stop'),
buttons = document.querySelector('.animation_parameters input'),
imageSelector = document.querySelector('.animation_parameters select#image'),
notificationParagraph = document.querySelector('#notifications p'),
animate;

var activateButton = function(button) {
    if (!js.hasClass(button,'active')) {
        js.addClass(button,'active');
    }
},

desactivateButton = function(button) {
    js.removeClass(button,'active');
},

updateNotification = function(msg){
    notificationParagraph.innerHTML = msg;
};

var imageData = function(){
    var
    imagesDataUrl = 'data/images.json',
    imagesObject = {},
    updateImageData = function(data){
        imagesObject = data;
    },

    getData = function(){
        return imagesObject;
    },

    getImageData = function(callback) {
        var xhr = new XMLHttpRequest(),
        that = this;
        xhr.open( "GET", imagesDataUrl, true );      // true makes this call asynchronous
        xhr.onreadystatechange = function () {    // need eventhandler since our call is async
             if ( xhr.readyState === 4 && xhr.status === 200 ) {  // check for success
                imagesObject = JSON.parse( xhr.responseText );
                if(callback) {
                    callback();
                }
             }
        };
        xhr.send(null);
    };

    return {
        run: getImageData,
        url: imagesDataUrl,
        getData: getData
    };
}();

var buildImageSelector = function(images){
    for (image in images){
        option = '<option value="' + image + '">' + image + '</option>';
        imageSelector.innerHTML += option;
    }
};

var init = function(){
    var images = imageData.getData(),
    selectedImage;

    buildImageSelector(images);
    selectedImage = imageSelector.value;

    animate = new Animate({
        frames: images[selectedImage].images,
        canvasWrapperID: 'canvas_wrapper',
        canvasWidth: images[selectedImage].width || 500,
        canvasHeight: images[selectedImage].height || 500,
        fps: fpsInput.value || 30 // frames per second
    });

    imageSelector.addEventListener('change', function(){
        selectedImage = imageSelector.value;
        animate.updateFrames(images[selectedImage].images);
        animate.updateHeight(images[selectedImage].height);
        animate.updateWidth(images[selectedImage].width);
    });

    fpsInput.addEventListener('change', function(){
        animate.updateSpeed(fpsInput.value);
        updateNotification('Is runing at '+fpsInput.value+' frames per second!');
    });

    startButton.addEventListener('click', function(){
        if (animate.isRunning()) {
            return;
        } else {
            activateButton(startButton);
            desactivateButton(stopButton);
            animate.start(fpsInput.value);
        }
        updateNotification('Is runing at '+fpsInput.value+' frames per second!');
    });

    stopButton.addEventListener('click', function(){
        animate.stop();
        startButton.value = 'start';
        activateButton(stopButton);
        desactivateButton(startButton);
        updateNotification('Is stopped!');
    });
}

imageData.run(init);

