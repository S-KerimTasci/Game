class Endboss extends MovableObject{
    x = 2800;
    y = 50;
    height = 400;
    width = 220;
    speed = 2

    hadFirstContact = false

    imagesAlert = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    imagesWalking = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    imagesHurt = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    imagesAttack = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    imagesDead = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    constructor(){
        super().loadIMG(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.animate();
    }

    animate() {
        let i = 0
        setInterval(() => {
            if (i < 15) {
                this.playAnimation(this.imagesAlert);
            } else {
                this.playAnimation(this.imagesWalking);
                this.moveLeft();
                
            }
            
            i++

            if (world.character.x > 1600 && !this.hadFirstContact)  {
                i = 0;
                this.x = 2250;
                this.hadFirstContact = true;
            }

            // if (world.character.x > 1600 && !this.playAnimation(this.imagesAlert)) {
            //     this.moveLeft();
            // }
        }, 100)
    }
}

