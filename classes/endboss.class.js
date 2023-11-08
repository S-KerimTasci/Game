class Endboss extends MovableObject {
    x = 80000;
    y = 50;
    height = 400;
    width = 220;
    speed = 2

    energy = 100

    hits = 0;

    offset = {
        top: 90,
        bottom: 0,
        left: 0,
        right: 0
    }

    hadFirstContact = false;
    fristDead = false;

    game_win_sound = new Audio('audio/game_win.mp3')

    imagesAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    imagesWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    imagesHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    imagesAttack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    imagesDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    constructor() {
        super().loadIMG(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.animate();
    }


    /**
     * Plays the animation for the different situation the endboss can be in & moves the endboss to the left
     * 
     */
    animate() {
        let i = 0;
        this.id5 = setInterval(() => {
            if (i < 15) {
                this.playAnimation(this.imagesAlert);
            } else if (world && this.x - world.character.x < 90) {
                this.endbossAttacks();
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
            } else if (this.isDead()) {
                this.killEndboss();
                if (this.currentImage == this.imagesDead.length) {
                    this.winGame();
                }
            } else {
                this.playAnimation(this.imagesWalking);
                this.moveLeft();
            }
            i++;

            if (world && world.character.x > 1600 && !this.hadFirstContact) {
                i = 0;
                this.placeEndbossforFirstContact()
            }
        }, 100);
    }


    /**
     * Places the Endboss on the canvas for the first contact with the character 
     * 
     */
    placeEndbossforFirstContact() {
        this.x = 2250;
        this.hadFirstContact = true;
    }


    /**
     * Kills the endboss
     * 
     */
    killEndboss() {
        this.setFirstDead(this.firstDead)
        this.firstDead = true;
        clearInterval(this.id1);
        clearInterval(this.id2);
        clearInterval(this.id3);
        clearInterval(this.id4);
        clearInterval(this.id6);
        this.playAnimation(this.imagesDead);
    }


    /**
     * Plays the endboss attack animation
     * 
     */
    endbossAttacks() {
        this.playAnimation(this.imagesAttack);
        this.moveLeft();
        this.chicken_sound.play();
    }


    /**
     * Win game 
     * 
     */
    winGame() {
        world.killEnemy(this);
        endGame();
        this.game_win_sound.play();
    }
}



