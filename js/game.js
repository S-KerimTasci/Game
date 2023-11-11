let world;
let keyboard = new Keyboard();
let fullscreenOpend = false;
let soundOn = true;

let audio =[];

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
let hud = document.getElementById('hud');
let runOutOfBottlesDiv = document.getElementById('runOutOfBottlesDiv')

let game_sound = new Audio('audio/backgroundmusic.ogg')
pushAudioIntoArray(game_sound)

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
    runOutOfBottlesDiv.classList.add('d-none')
    hud.classList.remove('d-none');
    init();
    if (soundOn) {
        game_sound.play();
    }
}

function endGame(x) {
    clearAllIntervals()
    game_sound.pause();
    endscreen.classList.remove('d-none');
    permanentBTNdiv.classList.add('permanentBTNdiv');
    permanentBTNdiv.classList.remove('permanentBTNdivInGame')
    hud.classList.add('d-none');
    if (x == true) {
        runOutOfBottlesDiv.classList.remove('d-none')
    }
}

function goBackToStartscreen() {
    endscreen.classList.add('d-none');
    startscreen.classList.remove('d-none');

}


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

function toggleInfoscreen(x) {
    infoscreen.classList[x]('d-none');
}


function toggleSound() {
    if (!soundOn) {
        speakerIMG.src = "img/speaker.png"
        soundOn = true;
        if (world) {
            unmuteAll();
            game_sound.play()
        }
    } else {
        speakerIMG.src = "img/speaker_x.png"
        soundOn = false;
        game_sound.pause();
        muteAll();
        
    }
}

function pushAudioIntoArray(x){
    audio.push(x)
}


function muteAll() {
    audio.forEach(function(audio) {
        audio.muted = true;
    });
}

function unmuteAll() {
    audio.forEach(function(audio) {
        audio.muted = false;
    });
}



