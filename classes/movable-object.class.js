class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    accelaration = 1.5;

    chicken_sound = new Audio('audio/chicken.mp3')
    jump_sound = new Audio('audio/jump.mp3')

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

    deadEnemy = false;

    playAnimation(img) {
        let i = this.currentImage % img.length;
        let path = img[i];
        this.img = this.imageCache[path]
        this.currentImage++
    }

    moveRight() {
        this.x += this.speed;
        if (this.y > 160) {
            this.speedY = 0;
            this.y = 160;
        }
    }

    moveLeft() {
        this.x -= this.speed;
        if (this instanceof Character && this.y > 160) {
            this.speedY = 0;
            this.y = 160;
        }

    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else {
            return this.y < 160;
        }
    }

    jump() {
        this.speedY = 25;
        this.jump_sound.play();
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

        /*(this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height) &&
            obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
        
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;

            */
    }

    hit(enemy) {
        if (this instanceof Endboss) {
            this.energy -= 10;
            //this.lastHit = new Date().getTime();
        } else if (!enemy.deadEnemy) {
            this.energy -= 5;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else if (!enemy.deadEnemy) {
            this.lastHit = new Date().getTime();
        }
    }

    hitEnemy() {
        this.energy = 0
    }

    isHurt() {
        let timesPassed = new Date().getTime() - this.lastHit;
        return timesPassed < 100;

    }

    isDead() {
        return this.energy == 0;
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
            //this.chicken_sound.play();
            this.playAnimation(this.imagesDead);
        }

    }

    animateDeath() {
        this.playAnimation(this.imagesDead);
    }

    setFirstDead(firstDead) {
        if (!firstDead) {
            return this.currentImage = 0;
        } else {
            return true
        }
    }
}