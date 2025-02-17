import Phaser from "phaser";
import Projectile from "./Projectile";
import { getTimeStamps } from "../utils/functions";

class Projectiles extends Phaser.Physics.Arcade.Group {
    constructor(scene, key) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 10,
            active: false,
            visible: false,
            key,
            classType: Projectile
        });
      
    }

    FireProjectile(player, velocity, anims) {
        const projectile = this.getFirstDead(false);

        if (!projectile) {
            return;
        }
    
        projectile.fire(
            player.flipX ? player.x - player.width / 2 : player.x + player.width / 2,
            player.y,
            velocity,
            player,
            anims
        );
    }
}

export default Projectiles;
