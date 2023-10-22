class DrawableObject {
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
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Coin || this instanceof Salsa || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left , this.y + this.offset.top, this.width - this.offset.right , this.height - this.offset.bottom);
            ctx.stroke();

        }
    }
}