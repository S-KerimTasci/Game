class World {

    air = new Air();

    backgoundobjects = [
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0)
    ]
    
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ]

    cloud = new Cloud();
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.addToMap(this.air)

        this.addObjectsToMap(this.backgoundobjects)
        
        this.addToMap(this.character)
        
        this.addToMap(this.cloud)
       
        this.addObjectsToMap(this.enemies)
        

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        })
    }

    addObjectsToMap(object){
        object.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
}