import snakeAnims from "../Anims/snakeAnims";
import Enemy from "./Enemy";

class Snake extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'Enemy-2')

        this.initSnake();
    }

    initSnake() {
        this.setSize(14, 60); 
        this.setOffset(11, 2);
        this.anims.play('snake-idle')
    }

 
}

export default Snake;