class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 60;
    energy = 1;
    imagesWalking = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    imagesDead = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    offset ={
        top:-10,
        bottom:-10,
        left:-10,
        right:-10
    }

    id1;
    id2;

    
    constructor() {
        super().loadIMG('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.imagesWalking)
        this.loadImages(this.imagesDead)


        this.x = 250 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;

        
        this.animateWalk()
    }

    animateWalk() {
         if (!this.deadEnemy) {
            this.id1 = setInterval(() => {
                this.moveLeft();
            }, 1000 / 60)
            this.id2 = setInterval(() => {
                this.playAnimation(this.imagesWalking);
            }, 100) 
         } else {
            this.playAnimation(this.imagesDead);
         }

    }

    animateDeath(){
        this.playAnimation(this.imagesDead);
    }


}