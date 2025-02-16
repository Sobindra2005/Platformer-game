import Projectile from "./Projectile";

class Fireball extends Projectile {
    constructor(scene, x, y) {
        super(scene, x, y, 'fireball')
        this.initFireball();
    }

    initFireball() {
        this.FireballAnims();
    }

    FireballAnims() {
        this.anims.play('fireball')
    }
}

export default Fireball;