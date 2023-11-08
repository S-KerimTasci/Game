class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    UP = false;
    DOWN = false;
    ACTION = false;

    constructor() {
        this.btnPressEvent();
        this.keyPressEvent();
        this.keyKeyupEvent();
    }

    /**
     * Sets the needed eventlisteners for the mobile buttons
     * 
     */
    btnPressEvent() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });

        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });

        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.ACTION = true;
        });

        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.ACTION = false;
        });
    }

    /**
     * Sets the needed eventlisteners for the keyboard buttons
     * 
     */
    keyPressEvent() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = true;
            }

            if (e.keyCode == 37) {
                this.LEFT = true;
            }

            if (e.keyCode == 38) {
                this.UP = true;
            }

            if (e.keyCode == 40) {
                this.DOWN = true;
            }

            if (e.keyCode == 32) {
                this.SPACE = true;
            }

            if (e.keyCode == 69 && world.character.collectedSalsaBottles > 0) {
                this.ACTION = true;
            }
        })
    }

    /**
     * Sets the needed eventlisteners for the keyboard buttons
     * 
     */
    keyKeyupEvent() {
        window.addEventListener("keyup", (e) => {
            this.RIGHT = false;
            this.LEFT = false;
            this.UP = false;
            this.DOWN = false;
            this.SPACE = false;
            this.ACTION = false;
        })
    }
}

