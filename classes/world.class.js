class World {
    level = level1;
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth(30);
    statusbarHealthEndboss = new StatusbarHealth(500);
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    throwableObject = [];
    firstContact = false;
    bottlesEmpty = false;
    gameWon = 'gameWon';
    gameLost = 'gameLost'

    MAX_SALSA_BOTTLES = countSalsaObjects(level1.object);

    coin_sound = new Audio('audio/coin.mp3');
    MAX_COINS = countCoinObjects(level1.object);
    collectedCoin = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
        pushAudioIntoArray(this.coin_sound);
        if (!soundOn) {
            muteAll();
        }
    }


    /**
     * Sets the world for the character
     * 
     */
    setWorld() {
        this.character.world = this
    }


    /**
     * Draws all needed elements on canvas
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgoundobjects)

        this.addToMap(this.level.cloud)

        this.addObjectsToMap(this.level.enemies)

        this.addObjectsToMap(this.level.object)

        this.addObjectsToMap(this.throwableObject)

        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0)
        //--------Space for fixed objects---------
        this.addToMap(this.statusbarHealth)
        if (this.endbossOnScreen(this.firstContact)) {
            this.addToMap(this.statusbarHealthEndboss)
            this.firstContact = true;
        }
        this.addToMap(this.statusbarCoin)
        this.addToMap(this.statusbarBottle)
        this.ctx.translate(this.camera_x, 0)

        this.ctx.translate(-this.camera_x, 0)

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }


    /**
     * Adds all elements from an array to the canvas
     * 
     */
    addObjectsToMap(object) {
        object.forEach((o) => {
            this.addToMap(o)
        });
    }


    /**
     * Adds an element on the canvas
     * 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips an object on the canvas on the y axis
     * 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }


    /**
     * Flips an object on the canvas on the y axis back
     * 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }


    /**
     * Runs all intervalls that are needed for the game
     * 
     */
    run() {
        setInterval(() => {
            this.checkCollisionWithObjects();
            this.checkCollisionOfBottle();
            this.checkGameStatus();
        }, 200);

        setInterval(() => {
            this.checkCollisionWithEnemies();
        }, 25);
    }


    /**
     * Checks the collision of bottles with enemies and ground
     * 
     */
    checkCollisionOfBottle() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
                    this.killSmallEnemyWithBottle(bottle, enemy)
                }
                else if (bottle.y > 360) {
                    bottle.animateBottleSplash();
                }
                else if (bottle.isColliding(enemy) && enemy instanceof Endboss) {
                    this.hitEndbossWithBottle(bottle, enemy)
                }
            });
        });
    }


    /**
     * Checks the collsion of the character with enemies
     * 
     */
    checkCollisionWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.CharacterIsAboveEnemy(this.character, enemy) && this.isCharacterJumping(this.character) && !(enemy instanceof Endboss)) {
                    this.killEnemy(enemy);
                } else {
                    this.character.hit(enemy);
                    this.statusbarHealth.setPercentage(this.character.energy)
                }
            }
        });
    }


    /**
     * Checks the collsion of the character with objects & removes collected objects from the canvas
     * 
     */
    checkCollisionWithObjects() {
        this.level.object.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                if (obj instanceof Coin) {
                    this.coin_sound.play();
                    this.collectCoin();
                } else if (obj instanceof Salsa) {
                    this.collectSalsa();
                }
            }
        });

        this.removeCollidedObjects();
    }


    /**
     * Removes collected objects from canvas
     * 
     */
    removeCollidedObjects() {
        this.level.object = this.level.object.filter((obj) => {
            if (obj instanceof Coin || obj instanceof Salsa) {
                if (this.character.isColliding(obj)) {
                    return false;
                }
            }
            return true;
        });
    }


    /**
     * Collects coins & updates coin statusbar
     * 
     */
    collectCoin() {
        this.collectedCoin++
        const percentage = (this.collectedCoin / this.MAX_COINS) * 100;
        this.statusbarCoin.setPercentage(percentage);
    }


    /**
     * Collects salsa/bottle & updates salsa/bottle statusbar
     * 
     */
    collectSalsa() {
        world.character.collectedSalsaBottles++;
        this.updateBottleStatusbar()
    }


    /**
     * Creates new throwable bottle
     * 
     */
        createThrowableObject() {
            if (this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x, this.character.y + 50, this)
                this.throwableObject.push(bottle);
            } else {
                let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 50, this)
                this.throwableObject.push(bottle);
            }
        
    }


    /**
     * Updates bottle statusbar after collecting or throwing a bottle
     * 
     */
    updateBottleStatusbar() {
        const bottlesRemaining = this.character.collectedSalsaBottles;
        const percentage = (bottlesRemaining / this.MAX_SALSA_BOTTLES) * 100;
        this.statusbarBottle.setPercentage(percentage);
    }


    /**
     * Checks if the character is above the enemy. The enemy.offset.top needes to be added not substacted from enemy.y because it's negative.
     * 
     */
    CharacterIsAboveEnemy(character, enemy) {
        return character.y + character.height - character.offset.bottom > enemy.y + enemy.offset.top
    }


    /**
     * Checks if charakter is jumping
     * 
     */
    isCharacterJumping(character) {
        return character.speedY < 0;
    }


    /**
     * Kills Enemy by stopping the movment, animating dead & playing sound
     *
     */
    killEnemy(enemy) {
        if (!(enemy instanceof Endboss)) {
            enemy.deadEnemy = true;
            clearInterval(enemy.id1);
            clearInterval(enemy.id2);
            enemy.animateDeath();
        } else {
            clearInterval(enemy.id5);
        }

        enemy.chicken_sound.play();

        this.deleteDeadEnemy(enemy)
    }


    /**
     * Deletes dead enemy from canvas
     * 
     */
    deleteDeadEnemy(enemy) {
        setTimeout(() => {
            if (enemy.imagesDead.length > 0) {
                const index = this.level.enemies.indexOf(enemy);
                if (index > -1) {
                    this.level.enemies.splice(index, 1);
                }
            }
        }, 1000);
    }


    /**
     * Checks if the x coordinate of the endboss is smaller then 2260. If so its health statusbar ist placed on the canvas
     * 
     */
    endbossOnScreen(firstContact) {
        if (!firstContact) {
            return this.level.enemies[this.level.enemies.length - 1].x < 2260
        } else {
            return true
        }
    }


    /**
     *Hits the endboss with a bottle and hurts it 
     *
     */
    hitEndbossWithBottle(bottle, enemy) {
        bottle.animateBottleSplash()
        enemy.hit(enemy);
        enemy.chicken_sound.play();
        this.statusbarHealthEndboss.setPercentage(enemy.energy)
    }


    /**
     *Hits a small enemy with a bottle and kills it 
     *
     */
    killSmallEnemyWithBottle(bottle, enemy) {
        this.killEnemy(enemy);
        bottle.animateBottleSplash()
    }

    checkGameStatus() {
        const salsaRemaining = countSalsaObjects(this.level.object);
        const bottlesRemaining = this.character.collectedSalsaBottles;
        const endboss = this.level.enemies[this.level.enemies.length - 1];

        if (salsaRemaining === 0 && bottlesRemaining === 0 && !endboss.isDead()) {
            this.bottlesEmpty = true;
            setTimeout(() => {
                this.character.loseGame();
            }, 2000);
        }
    }
}