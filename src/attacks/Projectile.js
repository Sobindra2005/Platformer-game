import Phaser from "phaser"
import AttackAnims from "../Anims/AttackAnims";

class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture ) {
    super(scene, x, y, texture )
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.init();
  }

  init() {
    AttackAnims(this.scene.anims)
    this.setGravity(0)
  }

  setDirection(velocity){
    this.setVelocityX(velocity)
    this.setScale(0.7)
  }
}

export default Projectile