class World {
    level = level1;
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    setWorld() {
        this.character.world = this
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgoundobjects)

        this.addToMap(this.character)

        this.addToMap(this.level.cloud)

        this.addObjectsToMap(this.level.enemies)

        this.addObjectsToMap(this.level.object)

        this.ctx.translate(-this.camera_x, 0)
        //--------Space for fixed objects---------
        this.addToMap(this.statusbarHealth)
        this.addToMap(this.statusbarCoin)
        this.addToMap(this.statusbarBottle)
        this.ctx.translate(this.camera_x, 0)

        this.ctx.translate(-this.camera_x, 0)


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(object) {
        object.forEach((o) => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }

    checkCollision(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy)
                    console.log('Collision! Pepes energy is', this.character.energy);
                }
            });
        }, 200);
    }
}