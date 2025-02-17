import Phaser from "phaser"
import spriteEffects from "../effects/spriteeffects";

class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.init();
    this.velocity = 0;
    this.travelledDistance = 0;
    this.MaxDistance = 600;
    this.damage = 20;

  }

  init() {
    
    this.setBodySize(15, 10)
    this.setOffset(this.width / 2 - 7.5, this.height / 2 - 5)

    this.setGravity(0)
    this.setScale(0.7)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)
    this.travelledDistance += this.body.deltaAbsX()

    if (this.travelledDistance > this.MaxDistance) {
      this.travelledDistance = 0;
      this.body.reset(0, 0);
      this.activateProjectile(false);
    }
  }

  setDirection(velocity) {
    this.velocity = velocity;
  }

  fire(x, y, velocity, player, texture) {
    this.body.reset(x, y)
    this.activateProjectile(true)
    this.setDirection(velocity)
    player.flipX ? this.setFlipX(true) : this.setFlipX(false)
    this.anims.play(texture);
    this.setVelocityX(this.velocity)
  }

  deliversHit(target) {
    const impactPosition= {x:this.x , y:this.y }
    this.activateProjectile(false)
    this.travelledDistance = 0;
    this.body.reset(0, 0);
    new spriteEffects(this.scene, 0, 0, 'hit-effect',impactPosition).playOn(target)
  }

  activateProjectile(isActive) {
    this.setActive(isActive)
    this.setVisible(isActive)
  }


}

export default Projectile;