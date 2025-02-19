import Enemy from "./Enemy";

class Bird extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'Enemy-1');
        this.initBird();
    }

    initBird() {
        this.anims.play('Enemy-1');
        this.setBodySize(this.body.width  - 5, this.body.height-20).setOffset(2.5, 20);
    }

   
}

export default Bird;