class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 60;
    energy = 1;
    imagesWalking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    imagesDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    offset ={
        top:-11,
        bottom:-20,
        left:-10,
        right:-10
    }
    
    constructor() {
        super().loadIMG('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.imagesWalking)
        this.loadImages(this.imagesDead)

        this.x = 250 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;
        
        this.animateWalk()
    }

}