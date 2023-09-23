class Chicken extends MovableObject {
    y = 350;
    height = 100;
    imagesWalking = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    


    constructor() {
        super().loadIMG('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.imagesWalking)

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.moveLeft();
        this.animateWalk()
    }

    animateWalk() {
        setInterval(() => {
            let i = this.currentImage % this.imagesWalking.length;
            let path = this.imagesWalking[i];
            this.img = this.imageCache[path]
            this.currentImage++
        }, 100)
    }


}