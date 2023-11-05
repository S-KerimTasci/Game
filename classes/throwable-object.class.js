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

    glas_shatter_sound = new Audio('audio/glas_shatter.mp3')

    constructor(x, y, world) {
        super().loadIMG('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.world = world;
        this.throw(100, 100);

        this.loadImages(this.imagesFlying)
        this.loadImages(this.imagesSplash)
    }

    
    throw() {
        if (this.world.character.collectedSalsaBottles > 0) {
            this.world.character.collectedSalsaBottles--;
            this.speedY = 15;
            this.applyGravity();

            this.animateBottleThrow();
            

            
            this.world.updateBottleStatusbar()
        }
    }

    animateBottleThrow(){
        this.id3 = setInterval(() => {
            this.playAnimation(this.imagesFlying)
        }, 60);
        this.id4 = setInterval(() => {
            this.x += 10;
        }, 1000 / 50);
    }

    animateBottleSplash(){
        clearInterval(this.id3)
        clearInterval(this.id4)
        this.playAnimation(this.imagesSplash)
        this-this.glas_shatter_sound.play();

        setTimeout(() => {
            // Überprüfen Sie erneut, ob sich die Flasche noch im throwableObject-Array befindet
            const index = this.world.throwableObject.indexOf(this);
            if (index > -1) {
                // Wenn die Flasche noch im Array ist, entfernen Sie sie
                this.world.throwableObject.splice(index, 1);
            }
        }, 1000);
    }
}