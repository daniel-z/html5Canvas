
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

    updateFrames = function(newFrames){
        frames = newFrames;
        if(continueAnimation) {
            restartAnimation();
        }
    },

    updateWidth = function(newWidth){
        canvas.width = newWidth;
        if(continueAnimation) {
            restartAnimation();
        }
    },

    updateHeight = function(newHeight){
        canvas.height = newHeight;
        if(continueAnimation) {
            restartAnimation();
        }
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

    isRunning = function() {
        return continueAnimation;
    },

    convertFPStoMiliSec = function(fps) {
        return 1000 / fps;
    },

    updateSpeed = function(newFPS){
        animationSpeed = convertFPStoMiliSec(newFPS);
    },

    animate = function() {
            setTimeout(function() {
            image.src = getNextFrame();
            if(shouldIContinueAnimation()) {
                animate();
            }
        }, animationSpeed);
    },

    startAnimation = function(framesPerSecond) {
        if (isRunning()) {
            return false;
        }
        continueAnimation = true;
        canvasCtx.clearRect(0,0,canvas.width,canvas.height);
        animate(framesPerSecond);
    },

    restartAnimation = function(framesPerSecond) {
        stopAnimation();
        setTimeout(function(){
            startAnimation(framesPerSecond);
        },100);
    };

    init();

    return {
        start: startAnimation,
        restart: restartAnimation,
        stop: stopAnimation,
        isRunning: isRunning,
        updateFrames: updateFrames,
        updateWidth: updateWidth,
        updateHeight: updateHeight,
        updateSpeed: updateSpeed
    };
};
