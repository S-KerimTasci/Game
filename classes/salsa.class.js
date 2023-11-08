class Salsa extends MovableObject{

    height = 100;
    width = 80;
    y = 330;

    offset ={
        top:10,
        bottom:10,
        left:20,
        right:30
    }

    imagesWalking = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    constructor(){
        super().loadIMG(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.x = 250 + Math.random() * 1500;
        this.animate()
    }

    /**
     * Plays the salsa bottle animation
     * 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 150)
    }

}