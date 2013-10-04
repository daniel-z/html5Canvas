

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
    canvasHeight: '400',
    fps: fpsInput.value || 30 // frames per second
});

startButton.addEventListener('click', function(){
    animate.start();
});

stopButton.addEventListener('click', function(){
    animate.stop();
});

