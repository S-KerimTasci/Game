class Chicken extends MovableObject{
    y = 350;
    height = 100;
    

    constructor(){
        super().loadIMG('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

        this.x = 200 + Math.random() * 500;
        this.animate();
    }


    animate(){
        setInterval(() => {
        this.x -= 0.15;
    }, 1000 / 60 )
}

}