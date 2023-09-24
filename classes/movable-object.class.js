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

    playAnimation(img){
        let i = this.currentImage % this.imagesWalking.length;
            let path = img[i];
            this.img = this.imageCache[path]
            this.currentImage++
    }

    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}