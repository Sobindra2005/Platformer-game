import Enemy from "./Enemy";

class Snake extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'Enemy-2');
        this.initSnake();
    }

    initSnake() {
        this.anims.play('Enemy-2');
        this.setBodySize(this.body.width - 10, this.body.height-5)
    }
}

export default Snake;