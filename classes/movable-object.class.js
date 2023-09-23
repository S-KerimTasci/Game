class MovableObject {
    x = 120;
    y = 50;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    loadIMG(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path]= img 
        });

    }

    moveRight() {

    }

    moveLeft() {

    }
}