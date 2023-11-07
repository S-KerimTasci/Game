let world;
let keyboard = new Keyboard();
let fullscreenOpend = false;
let soundOn = true;

let canvas = document.getElementById('canvas');
let fullscreen = document.getElementById('fullscreen');
let startscreen = document.getElementById('startscreen');
let endscreen = document.getElementById('endscreen');
let infoscreen = document.getElementById('infoscreen');
let startIMG = document.getElementById('startIMG');
let endIMG = document.getElementById('endIMG');
let fullscreenIMG = document.getElementById('fullscreenIMG');
let speakerIMG = document.getElementById('speakerIMG');
let permanentBTNdiv = document.getElementById('permanentBTNdiv');

let game_sound = new Audio('audio/backgroundmusic.ogg')

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement === null) {
        // Vollbildmodus wurde deaktiviert
        setFullscreenCSS('remove');
        fullscreenOpend = false;
    } else {
        // Vollbildmodus wurde aktiviert
        setFullscreenCSS('add');
        fullscreenOpend = true;
    }
});

function startGame() {
    startscreen.classList.add('d-none');
    endscreen.classList.add('d-none');
    permanentBTNdiv.classList.remove('permanentBTNdiv');
    permanentBTNdiv.classList.add('permanentBTNdivInGame')
    init();
    if (soundOn) {
        game_sound.play();
    }
}

function endGame() {
    clearAllIntervals()
    game_sound.pause();
    endscreen.classList.remove('d-none');
    permanentBTNdiv.classList.add('permanentBTNdiv');
    permanentBTNdiv.classList.remove('permanentBTNdivInGame')
}

function goBackToStartscreen() {
    endscreen.classList.add('d-none');
    startscreen.classList.remove('d-none');

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
        initLevel();
        world = new World(canvas, keyboard)

}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function toggleFullscreen() {
    if (!fullscreenOpend) {
        enterFullscreen(fullscreen);
        setFullscreenCSS('add');
        fullscreenOpend = true;
    } else {
        exitFullscreen()
        setFullscreenCSS('remove');
        fullscreenOpend = false;
    }
}

function toggleSound(){
    if (!soundOn) {
        speakerIMG.src = "img/speaker.png"
        soundOn = true;
        if (world) {
            game_sound.play()
        }
    } else {
        speakerIMG.src = "img/speaker_x.png"
        soundOn =false;
        game_sound.pause();
    }
}

function setFullscreenCSS(x) {
    startscreen.classList[x]('enterFullscreen');
    endscreen.classList[x]('enterFullscreen');
    infoscreen.classList[x]('enterFullscreen');
    canvas.classList[x]('enterFullscreen');
    startIMG.classList[x]('enterFullscreen');
    endIMG.classList[x]('enterFullscreen');
    if (x == 'add') {
        fullscreenIMG.src = "img/exit_fullscreen.png"
    } else {
        fullscreenIMG.src = "img/fullscreen.png" 
    }
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

function toggleInfoscreen(x){
    infoscreen.classList[x]('d-none');
}



