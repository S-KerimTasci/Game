class MovableObject {
    x = 120;
    y = 50;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadIMG(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img
        });
    }

    playAnimation(img) {
        let i = this.currentImage % this.imagesWalking.length;
        let path = img[i];
        this.img = this.imageCache[path]
        this.currentImage++
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        return this.y < 150;
    }

    jump() {
        this.speedY = 15;
    }
}