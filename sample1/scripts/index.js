// ---
// This is were the magic happens
// ---

var Animate = function(options) {
    var
    canvasWrapper,
    canvas,
    canvasCtx,
    frameIndex,
    animationSpeed,
    frames,
    image,
    continueAnimation,
    nonOptionalParamas = ['canvasWrapperID', 'fps', 'frames'];

    for(var index in nonOptionalParamas) {
        var parameter = nonOptionalParamas[index];
        if(!options[parameter]) {
            return false;
        }
    }

    // ------------------------------------------------------------
    // functions
    // ------------------------------------------------------------

    var init = function(){
        canvasWrapper = document.getElementById(options.canvasWrapperID);
        canvas = document.createElement('canvas');
        canvasCtx = canvas.getContext('2d');
        frameIndex = -1;
        animationSpeed = 1000 / options.fps;
        frames = options.frames;
        image = new Image();
        continueAnimation = false;

        canvas.width = options.canvasWidth || 500;
        canvas.height = options.canvasHeight || 500;
        canvasWrapper.appendChild(canvas);
        image.onload = drawImage;
    },

    drawImage = function() {
        canvasCtx.drawImage(image, 0, 0);
    },

    getNextFrameIndex = function() {
        frameIndex += 1;
        if (frameIndex >= frames.length) {
            frameIndex = 0;
        }
        return frameIndex;
    },

    getNextFrame = function() {
        return frames[getNextFrameIndex()];
    },

    shouldIContinueAnimation = function() {
        return continueAnimation;
    },

    stopAnimation = function() {
        continueAnimation = false;
    },

    animate = function() {
        setTimeout(function() {
            image.src = getNextFrame();
            if(shouldIContinueAnimation()) {
                animate();
            }
        }, animationSpeed);
    },

    startAnimation = function() {
        continueAnimation = true;
        animate();
    };

    init();

    return {
        start: startAnimation,
        stop: stopAnimation,
    };
};

var images = [
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
    fps: 1 // frames per second
});

animate.start();

