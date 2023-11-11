let world;
let keyboard = new Keyboard();
let fullscreenOpend = false;

let soundOn = false;
let soundCheckedAfterInit = false;
let gameRestarted = false;
let audio = [];

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


/**
 * Sets the CSS classes that are needed when entering/exiting Fullscreen via ESC button
 * 
 */
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


/**
 * Start the game for the first time
 * 
 */
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


/**
 * Restarts the game
 * 
 */
function restartGame() {
    gameRestarted = true;
    startGame();
}


/**
 * Ends the game
 * 
 */
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


/**
 * Brings the player back to the startscreen
 * 
 */
function goBackToStartscreen() {
    endscreen.classList.add('d-none');
    startscreen.classList.remove('d-none');
}


/**
 * Initialize new level and world
 * 
 */
function init() {
    initLevel();
    world = new World(canvas, keyboard);
    if (!gameRestarted) {
        toggleSound();
    }
}


/**
 * Clears all intervals after a games has ended
 * 
 */
function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
}


/**
 * Toggles the fullscreenmodus
 * 
 */
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


/**
 * Sets the CSS classes that are needed when entering/exiting Fullscreen
 * 
 */
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


/**
 * Enter Fullscreen
 * 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * Exit Fullscreen
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * Toggle infoscreen visibility
 * 
 */
function toggleInfoscreen(x) {
    infoscreen.classList[x]('d-none');
}


/**
 * Mutes / Plays SFX & music
 * 
 */
function toggleSound() {
    if (world && !soundOn && !soundCheckedAfterInit) {
        game_sound.pause();
        muteAll();
        soundCheckedAfterInit = true;
    }
    else if (!soundOn) {
        speakerIMG.src = "img/speaker.png"
        if (!soundCheckedAfterInit) {
            soundCheckedAfterInit = true;
        } else {
            soundOn = true;
            unmuteAll();
            game_sound.play();
        }
    } else {
        speakerIMG.src = "img/speaker_x.png"
        soundOn = false;
        game_sound.pause();
        muteAll();
    }
}

/**
 * Pushes every newly created audio into the audio array
 * 
 */
function pushAudioIntoArray(x) {
    audio.push(x)
}


/**
 * Mutes everything in the audio array
 * 
 */
function muteAll() {
    audio.forEach(function (audio) {
        audio.muted = true;
    });
}


/**
 * Plays everything in the audio array
 * 
 */
function unmuteAll() {
    audio.forEach(function (audio) {
        audio.muted = false;
    });
}



