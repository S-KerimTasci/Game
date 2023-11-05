let world;
let keyboard = new Keyboard();
let gameRestarted = false;
let fullscreenOpend = false;

let canvas = document.getElementById('canvas');
let fullscreen = document.getElementById('fullscreen');
let startscreen = document.getElementById('startscreen');
let endscreen = document.getElementById('endscreen');
let startIMG = document.getElementById('startIMG');
let endIMG = document.getElementById('endIMG');

function startGame() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    init();
}

function endGame() {
    clearAllIntervals()
    document.getElementById('endscreen').classList.remove('d-none');
    gameRestarted = true;
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 69 && world.character.collectedSalsaBottles > 0) {
        keyboard.ACTION = true;
    }
})


window.addEventListener("keyup", (e) => {
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.ACTION = false;
})

function init() {
    if (!gameRestarted) {
        world = new World(canvas, keyboard)
    } else {
        location.reload();
    }
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function toggleFullscreen() {
    if (!fullscreenOpend) {
        enterFullscreen(fullscreen);
        setFullscreenCSS();
        fullscreenOpend = true;
    } else {
        exitFullscreen()
        setExitFullscreenCSS()
        fullscreenOpend = false;
    }
}

function setFullscreenCSS(){
    startscreen.classList.add('enterFullscreen');
    endscreen.classList.add('enterFullscreen');
    canvas.classList.add('enterFullscreen');
    startIMG.classList.add('enterFullscreen');
    endIMG.classList.add('enterFullscreen');
}

function setExitFullscreenCSS(){
    startscreen.classList.remove('enterFullscreen');
        endscreen.classList.remove('enterFullscreen');
        canvas.classList.remove('enterFullscreen');
        startIMG.classList.remove('enterFullscreen');
        endIMG.classList.remove('enterFullscreen');
}



function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}



