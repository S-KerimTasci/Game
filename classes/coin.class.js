class Coin extends MovableObject{

    imagesWalking = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    offset ={
        top:35,
        bottom:70,
        left:25,
        right:50
    }

    constructor(){
        super().loadIMG(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.x = 250 + Math.random() * 1500;
        this.y = 250 - Math.random() * 100;
        this.animate()
    }

    
    /**
     * Plays the coin animation
     * 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 150)
    }

}