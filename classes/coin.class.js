class Coin extends MovableObject{

    y = 250

    imagesWalking = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png',
    ]

    constructor(){
        super().loadIMG(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.x = 250 + Math.random() * 1500;
        this.y = 250 - Math.random() * 100;
        this.animate()
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 150)
    }

}