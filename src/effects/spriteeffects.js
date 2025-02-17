import { Physics } from "phaser";


class spriteEffects extends Physics.Arcade.Sprite {
    constructor(scene, x, y, effectName , impactPosition) {
        super(scene, x, y)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.target = null;
        this.effectname = effectName;
        this.yCordinate = null;
        this.setBodySize(30, 30)
        this.setOffset(1, 1)
        this.setScale(0.8)
        this.impactPosition = impactPosition ; 
        this.on('animationcomplete', animation => {
            if (animation.key == this.effectname) {
                this.destroy()
            }
        }, this)
    
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.target) {
            this.placeEffect();
        }
    }

    placeEffect() {
        if (!this.target || !this.body) { return; }
        const center = this.target.getCenter();
        this.body.reset(center.x, this.impactPosition.y);
    }

    playOn(target) {
        this.target = target
        this.play(this.effectname, true);
        this.placeEffect();
    }
}

export default spriteEffects;