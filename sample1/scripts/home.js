
// ---------------------------------------------------------------------------
// Js Code for Home Page
// ---------------------------------------------------------------------------

var
fpsInput = document.querySelector('input.fps'),
startButton = document.querySelector('input.start'),
stopButton = document.querySelector('input.stop'),
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


var
hasClass = function (ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
},

removeClass = function (ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
},

addClass = function (ele,cls) {
    if (!hasClass(ele,cls)) {
        ele.className += ' ' + cls;
    }
},

activateButton = function(button) {
    if (!hasClass(button,'active')) {
        addClass(button,'active');
    }
},

desactivateButton = function(button) {
    removeClass(button,'active');
};

startButton.addEventListener('click', function(){
    if (animate.isRunning()) {
        animate.restart(fpsInput.value);
    } else {
        startButton.value = 're-start';
        activateButton(startButton);
        desactivateButton(stopButton);
        animate.start(fpsInput.value);
    }
});

stopButton.addEventListener('click', function(){
    animate.stop();
    startButton.value = 'start';
    activateButton(stopButton);
    desactivateButton(startButton);
});

