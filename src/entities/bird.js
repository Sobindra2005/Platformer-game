import Enemy from "./Enemy";

class Bird extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'Enemy-1');
        this.initBird();
    }

    initBird() {
        this.anims.play('Enemy-1');
        
    }

   
}

export default Bird;