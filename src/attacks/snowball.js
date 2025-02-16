import Projectile from "./Projectile";

class Snowball extends Projectile {
    constructor(scene, x, y) {
        super(scene, x, y, 'snowball')
        this.initSnowball();
    }

    initSnowball() {
        this.AttackAnims()
    }
    
    AttackAnims() {
        this.anims.play('snowball')
    }
}

export default Snowball