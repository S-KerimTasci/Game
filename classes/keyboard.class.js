class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    UP = false;
    DOWN = false;
    ACTION = false;

    constructor(){
        this.btnPressEvent()
    }

    btnPressEvent(){
        document.getElementById('btnLeft').addEventListener('touchstart' , (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnLeft').addEventListener('touchend' , (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart' , (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btnRight').addEventListener('touchend' , (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btnJump').addEventListener('touchstart' , (e) => {
            e.preventDefault();
            this.UP = true;
        });

        document.getElementById('btnJump').addEventListener('touchend' , (e) => {
            e.preventDefault();
            this.UP = false;
        });

        document.getElementById('btnThrow').addEventListener('touchstart' , (e) => {
            e.preventDefault();
            this.ACTION = true;
        });

        document.getElementById('btnThrow').addEventListener('touchend' , (e) => {
            e.preventDefault();
            this.ACTION = false;
        });
    }
}

