let canvas;
let ctx;
let world = new World


function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d')
    //character.src = '../img/2_character_pepe/2_walk/W-21.png'

    console.log('My character is', world.character )

    
    
    //ctx.drawImage(character,20,20,50,150)

}