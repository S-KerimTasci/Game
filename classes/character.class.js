class Character extends MovableObject {

    height =280;
    width = 125;
    y = 150
    imagesWalking = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ]
    world;
    speed = 5;

    walking_sound = new Audio('../audio/walking.mp3')


    constructor() {
        super().loadIMG('../img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.imagesWalking)

        this.animate();
    }

    animate() {
        
        
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT ) {
                this.playAnimation(this.imagesWalking)
                this.walking_sound.play();
            }
        }, 50)

    }

    jump() {

    }
}