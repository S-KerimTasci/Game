class ThrowableObject extends MovableObject {
    imagesFlying = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    imagesSplash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x,y) {
        super().loadIMG('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.throw(100, 100);
        //this.applyGravity();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 10
        }, 1000/ 50);

        /*
        setInterval(() => {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
        }, 1000 / 25)
        */



        /*setInterval(() => {
            if (this.world.keyboard.ACTION) {
                this.speedY = 25;
                console.log('ACTION!')
            }
        }, 1000/60);
        */

    }
}