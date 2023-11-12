class Character extends MovableObject {

    height = 280;
    width = 125;
    y = 150;
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

    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]


    world;
    speed = 5;
    speedY = 0;
    characterDead = false;

    collectedSalsaBottles = 0;

    offset = {
        top: 100,
        bottom: 90,
        left: 15,
        right: 35
    }


    walking_sound = new Audio('audio/walking.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    dying_sound = new Audio('audio/dying.mp3');
    game_lost_sound = new Audio('audio/game_lost.mp3');


    constructor() {
        super().loadIMG('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesIdle);
        this.applyGravity();
        this.animateCharacterMovment();
        this.animateCharacterIMG();
        pushAudioIntoArray(this.walking_sound);
        pushAudioIntoArray(this.hurt_sound);
        pushAudioIntoArray(this.dying_sound);
        pushAudioIntoArray(this.game_lost_sound);

    }


    /**
     * Plays the movment animation of the character
     * 
     */
    animateCharacterMovment() {
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
    }


    /**
     * Plays the  animation of the character dying, getting hurt, jumping & moving 
     * 
     */
    animateCharacterIMG() {
        this.id6 = setInterval(() => {
            this.walking_sound.pause();
            if (this.isDead()) {
                this.killCharacter();
                if (this.currentImage == this.imagesDead.length) {
                    this.loseGame();
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt)
                this.hurt_sound.play();
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.imagesJumping)
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.imagesWalking)
                this.walking_sound.play();
            } else {
                this.playAnimation(this.imagesIdle)
            }
        }, 50)
    }


    /**
     * Kills character
     * 
     */
    killCharacter() {
        this.setFirstDead(this.characterDead)
        this.characterDead = true;
        clearInterval(this.id1);
        clearInterval(this.id2);
        clearInterval(this.id3);
        clearInterval(this.id4);
        clearInterval(this.id5);
        this.playAnimation(this.imagesDead);
    }


    /**
     * Lose game
     * 
     */
    loseGame() {
        if (this.world.bottlesEmpty) {
            let x = this.world.bottlesEmpty;
            endGame(x);
        } else if (this.world.gameLost) {
            let x = this.world.gameLost;
            endGame(x);
        } 
        clearInterval(this.id6);
        this.dying_sound.play();
        this.game_lost_sound.play();
    }
}