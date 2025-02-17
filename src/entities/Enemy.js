import Phaser from "phaser";
import collidable from "../mixins/collidable";
import snakeAnims from "../Anims/snakeAnims";
import BirdAnims from "../Anims/BirdAnims";

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.init();
        this.initEvents();
        this.tinefromLastturn = null
        this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } })
        this.platformColliderLayer = null;
        this.health = 100;
    }

    init() {
        if (!this.body) {
            return;
        }

        BirdAnims(this.scene.anims);
        snakeAnims(this.scene.anims)
        this.body.setGravityY(1200);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setBodySize(this.width - 10, this.height);
        Object.assign(this, collidable);
        this.speed = 40;
    }

    initEvents() {
        this.setVelocityX(this.speed)
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {

        if (this.getBounds().bottom > this.scene.cameras.main.height) {
            this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);
            this.setActive(false);
            this.rayGraphics.clear();
            this.destroy();
            return;
        }
        this.patroling(time);
    }

    patroling(time) {
        if (!this.body || !this.body.onFloor()) {
            return;
        }

        const { ray, hasHit } = this.raycast(this.body, this.platformColliderLayer, 45, 3);

        if (this.body | !hasHit && this.tinefromLastturn + 100 < time) {
            this.setFlipX(!this.flipX);
            this.speed = -this.speed;
            this.setVelocityX(this.speed);
            this.tinefromLastturn = time
        }


        this.setVelocityY(10);
        this.scene.time.delayedCall(200, () => {
            this.setVelocityY(100);
        });

        this.rayGraphics.clear();

        if (ray) {
            this.rayGraphics.strokeLineShape(ray).setAlpha(0);
        }
    }

    createPlatformCollider(platformCollider) {
        this.platformColliderLayer = platformCollider
    }

    takesHit(source) {
        this.health -= 20;
        source.deliversHit(this);
        const currentEnemy = this.texture.key;
        this.anims.play(`${currentEnemy}-hurt`);
        this.once('animationcomplete', (animation) => {
            if (animation.key == `${currentEnemy}-hurt`) {
                this.anims.play(`${currentEnemy}-idle`)
            }
        },
            this
        )
        if (this.health <= 0) {
            this.setVelocityY(-300)
            this.setTint(0xff0000);
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
        }
    }


}

export default Enemy;
