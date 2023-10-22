class SmallChicken extends MovableObject {
    y = 350;
    height = 60;
    width = 50
    imagesWalking = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    imagesDead = [
        '../img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    offset ={
        top:-10,
        bottom:30,
        left:-10,
        right:-10
    }

    
    constructor() {
        super().loadIMG('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.imagesWalking)
        this.loadImages(this.imagesDead)

        this.x = 250 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;

        
        this.animateWalk()
    }

    animateWalk() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 100)
    }


}