class Character extends MovableObject {

    height = 280;
    width = 125;
    y = 160;
    imagesWalking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    imagesJumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    imagesDead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    imagesHurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]


    world;
    speed = 5;
    speedY = 0;
    characterDead = false;

    collectedSalsaBottles = 0

    offset ={
        top:100,
        bottom:90,
        left:10,
        right:30
    }
    

    walking_sound = new Audio('audio/walking.mp3')
    hurt_sound = new Audio('audio/hurt.mp3')
    dying_sound = new Audio('audio/dying.mp3')


    constructor() {
        super().loadIMG('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.imagesWalking)
        this.loadImages(this.imagesJumping)
        this.loadImages(this.imagesDead)
        this.loadImages(this.imagesHurt)
        this.applyGravity()
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        this.id6 = setInterval(() => {
            if (this.isDead()) {
                this.setFirstDead(this.characterDead)
                this.characterDead = true;
                clearInterval(this.id1);
                clearInterval(this.id2);
                clearInterval(this.id3);
                clearInterval(this.id4);
                clearInterval(this.id5);
                this.playAnimation(this.imagesDead);
                if (this.currentImage == this.imagesDead.length) {
                    clearInterval(this.id6);
                    endGame();
                    this.dying_sound.play();
                }
            } else if (this.isHurt()) {
               this.playAnimation(this.imagesHurt)
               this.hurt_sound.play();
            }
             else if (this.isAboveGround()) {
                this.playAnimation(this.imagesJumping)
            } else {
                this.walking_sound.pause();
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.imagesWalking)
                    this.walking_sound.play();
                }
            }
        }, 50)
    }

}