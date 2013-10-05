
// ---------------------------------------------------------------------------
// Js Code for Home Page
// ---------------------------------------------------------------------------

var
fpsInput = document.querySelector('input.fps'),
startButton = document.querySelector('input.start'),
stopButton = document.querySelector('input.stop'),
buttons = document.querySelector('.animation_parameters input'),
notificationParagraph = document.querySelector('#notifications p'),
images = [
    'images/bicicle1.jpg',
    'images/bicicle2.jpg',
    'images/bicicle3.jpg',
    'images/bicicle4.jpg',
    'images/bicicle5.jpg',
    'images/bicicle6.jpg',
    'images/bicicle7.jpg',
    'images/bicicle8.jpg',
    'images/bicicle9.jpg',
    'images/bicicle10.jpg',
    'images/bicicle11.jpg'
],
animate = new Animate({
    frames: images,
    canvasWrapperID: 'canvas_wrapper',
    canvasWidth: '500',
    canvasHeight: '300',
    fps: fpsInput.value || 30 // frames per second
});


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

startButton.addEventListener('click', function(){
    if (animate.isRunning()) {
        animate.restart(fpsInput.value);
    } else {
        startButton.value = 'update';
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


