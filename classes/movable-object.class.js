class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    accelaration = 1.5;

    deadEnemy = false;

    chicken_sound = new Audio('audio/chicken.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    // ID to stop the animate enemy intervall
    id1;
    id2;
    // ID to stop the anmate thorw bottle and splash bottle intervalls
    id3;
    id4;
    // ID to stop the animate endboss intervall
    id5;
    // ID to stop the animate character intervall
    id6;


    /**
     * Numarical offsets used for collison check
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    
    /**
     * Plays the animation of a moveable object
     * 
     */
    playAnimation(img) {
        let i = this.currentImage % img.length;
        let path = img[i];
        this.img = this.imageCache[path]
        this.currentImage++
    }


    /**
     * Moves the Object to the right
     * 
     */
    moveRight() {
        this.x += this.speed;
        if (this.y > 160) {
            this.speedY = 0;
            this.y = 160;
        }
    }


    /**
     * Moves the Object to the right
     * 
     */
    moveLeft() {
        this.x -= this.speed;
        if (this instanceof Character && this.y > 160) {
            this.speedY = 0;
            this.y = 160;
        }
    }


    /**
     * Applays gravity to objects in air that need to fall
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 40)
    }


    /**
     * Checks if an element is above ground
     * 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else {
            return this.y < 160;
        }
    }


    /**
     * Makes an element jump
     * 
     */
    jump() {
        this.speedY = 25;
        this.jump_sound.play();
    }


    /**
     *Checks if two objects are collinding 
     *
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Reduces the energy of an eleemnt that got hit
     * 
     */
    hit(enemy) {
        if (this instanceof Endboss) {
            this.energy -= 10;
        } else if (!enemy.deadEnemy) {
            this.energy -= 5;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else if (!enemy.deadEnemy) {
            this.lastHit = new Date().getTime();
        }
    }

   
    /**
     * Sets the energy of small enemies that are one shootable to 0 
     * 
     */
    hitEnemy() {
        this.energy = 0
    }


    /**
     * Checks if an element is getting hurt
     * 
     */
    isHurt() {
        let timesPassed = new Date().getTime() - this.lastHit;
        return timesPassed < 100;
    }


    /**
     * Checks if an eleemnt is dead
     * 
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Plays the walking animation and moves the element to the left
     * 
     */
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


    /**
     * Plays death animation
     * 
     */
    animateDeath() {
        this.playAnimation(this.imagesDead);
    }

    
    /**
     * Checks if an element died for the first time. Is used for elements that have an dead animation with multiple IMG
     * 
     */
    setFirstDead(firstDead) {
        if (!firstDead) {
            return this.currentImage = 0;
        } else {
            return true
        }
    }
}