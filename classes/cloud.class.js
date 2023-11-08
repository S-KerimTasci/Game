class Cloud extends MovableObject{
    x = 0;
    y = 50;
    width = 500;
    

    constructor(){
        super().loadIMG('img/5_background/layers/4_clouds/1.png')

        this.x = 200 + Math.random() * 500;

        this.animate();
    }

    /**
     * Moves the cloud to the left
     * 
     */
    animate(){
     this.moveLeft();
}

}
