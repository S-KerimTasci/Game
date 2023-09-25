class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 60
    imagesWalking = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    


    constructor() {
        super().loadIMG('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.imagesWalking)

        this.x = 250 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;

        this.moveLeft();
        this.animateWalk()
    }

    animateWalk() {
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 100)
    }


}