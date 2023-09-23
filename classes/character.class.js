class Character extends MovableObject{

    height = 400;
    width = 200;
    imagesWalking = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ]

    

    constructor(){
        super().loadIMG('../img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.imagesWalking)

        this.animate();
    }
 
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.imagesWalking.length;
            let path = this.imagesWalking[i];
            this.img = this.imageCache[path]
            this.currentImage++
        }, 100)
    }

    jump(){

    }
}