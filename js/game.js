let canvas;
let world;
let keyboard = new Keyboard();

function startGame(){
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('endscreen').classList.add('d-none'); 
    init();
}

function endGame(){
    clearAllIntervals()
    document.getElementById('endscreen').classList.remove('d-none');   
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

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard)

    console.log('My character is', world.character )  
}

// function endgame(){
//     console.log('Game Over')
// }

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }