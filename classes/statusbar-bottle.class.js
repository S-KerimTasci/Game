class StatusbarBottle extends DrawableObject {
    percentage = 100;

    Images = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.Images);
        this.x = 30;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    /**
     * Displays the right statusbar IMG based on the percentage 
     * 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images[this.resolveImageIndex()];
        this.img = this.imageCache[path]
    }

    
    /**
     * Retruns the current percentage 
     * 
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }
}