import BirdAnims from "../Anims/BirdAnims";
import Enemy from "./Enemy";

class Bird extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'Enemy-1')
        this.initBird();

    }

    initBird() {
        this.setSize(this.width - 20, this.height - 20);
        this.setOffset((this.width - (this.width - 20)) / 2, 20);

        this.anims.play('bird-idle')
    }
}

export default Bird;