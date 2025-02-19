import Phaser from "phaser";
import collidable from "../mixins/collidable";

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
        this.leftBodyWidth = 100;
        this.rightBodyWidth = 100;
        this.PlayerInZone = false;
        this.shortRangeLine = null;
        this.shortrange = false
        this.setOrigin(0.5,0.5)
    }

    update(time) {

        this.coordinateUpdate(this.rightDetector, 'right')
        this.coordinateUpdate(this.leftDetector, 'left')

        this.previousX = this.x;

        if (this.getBounds().bottom > this.scene.cameras.main.height) {
            this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);
            this.setActive(false);
            this.rayGraphics.clear();
            this.destroy();
            return;
        }

        const isOverlapping = this.scene.physics.overlap(this.player, this.leftDetector) ||
            this.scene.physics.overlap(this.player, this.rightDetector);

        this.PlayerInZone = isOverlapping;
        this.PlayerInZone = isOverlapping;

        const shortRangeOverlapping = this.scene.physics.overlap(this.player, this.shortRangeLine)
        this.shortrange = shortRangeOverlapping;

        if (this.PlayerInZone) {
            this.setVelocityX(0)
            this.shortRangeLinePositionUpdate();
            return;
        }



        this.shortRange == null

        this.patroling(time);
    }

    init() {
        if (!this.body) {
            return;
        }

        this.previousX = this.x;

        if (this.PlayerInZone) {
            this.createShortRangeBox();
        }

        this.LeftDetector();
        this.RightDetector();
        this.body.setGravityY(1200);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setBodySize(this.width - 10, this.height);
        Object.assign(this, collidable);

        this.speed = 40;
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    LeftDetector() {

        this.leftDetector = this.scene.physics.add.sprite(this.x, this.y, null).setBodySize(30, 10).setAlpha(0).refreshBody()
    }

    RightDetector() {
        this.rightDetector = this.scene.physics.add.sprite(this.x, this.y, null).setBodySize(30, 10).setAlpha(0).refreshBody()
      
    }

    coordinateUpdate(body, direction) {

        const deltaX = this.x - this.previousX;
        const widthChange = Math.abs(deltaX) * 0.8;

        if (deltaX > 0) {
            if (direction === 'right') {
                this.rightBodyWidth -= widthChange;
            } else {
                this.leftBodyWidth += widthChange;
            }
        } else if (deltaX < 0) {

            if (direction === 'right') {
                this.rightBodyWidth += widthChange;
            } else {
                this.leftBodyWidth -= widthChange;
            }
        }

        const width = direction === 'right' ? this.rightBodyWidth : this.leftBodyWidth;
        const offsetX = width / 2;

        if (direction === 'right') {
            body.x = this.x + offsetX;
        } else {
            body.x = this.x - offsetX;
        }

        body.y = this.y;
        body.setBodySize(width, body.body.height).refreshBody();
    }

    PlayerInPlatformDetector(player) {
        this.player = player;
        this.scene.physics.add.overlap(player, this.leftDetector, OverlapFunction, null, this)
        this.scene.physics.add.overlap(player, this.rightDetector, OverlapFunction, null, this)

        function OverlapFunction() {
            this.PlayerInZone = true

            if (!this.shortRangeLine) {
                this.createShortRangeBox()
                this.scene.physics.add.overlap(player, this.shortRangeLine, this.ShortRangeAttack, null, this)
            }
            this.EnemyAttack();

            if (this.x < player.x) {
                this.setFlipX(false)
            }
            if (this.x > player.x) {
                this.setFlipX(true)
            }
        }
    }


    createShortRangeBox() {
        this.shortRangeLine = this.scene.physics.add.sprite(this.x, this.y, null).setAlpha(0).setBodySize(40, 10).refreshBody();
    }

    shortRangeLinePositionUpdate() {
        this.shortRangeLine.x = this.flipX ? this.x - this.width / 2 : this.x + this.width / 2;
        this.shortRangeLine.y = this.y
    }

    EnemyAttack() {
        if (this.shortrange && this.PlayerInZone) {
            console.log('meele weapon ')
        }
        else if (!this.shortrange && this.PlayerInZone) {
            console.log('long  weapon ')
        }
    }

    MeeleWeaponAttack() {
        // this.anims.play(`${this.texture.key}-attack`, true)
    }



    patroling(time) {
    
        if (!this.body || !this.body.onFloor()) {
            return;
        }

        const { ray, hasHit } = this.raycast(this.body, this.platformColliderLayer, 45, 3);

        this.setVelocityX(this.speed);



        if (!hasHit && this.tinefromLastturn + 100 < time) {
            this.speed = -this.speed;
            this.setVelocityX(this.speed);
            this.tinefromLastturn = time;
        }

        if (this.body.deltaX() > 0) {
            this.setFlipX(false);
        } else {
            this.setFlipX(true);
        }
        this.setVelocityY(100);
        this.scene.time.delayedCall(200, () => {
            this.setVelocityY(100);
        });

        this.rayGraphics.clear();

        if (ray) {
            this.rayGraphics.strokeLineShape(ray).setAlpha(1);
        }
    }

    createPlatformCollider(platformCollider) {
        this.platformColliderLayer = platformCollider
    }

    meleeWeaponAttack() {
        if (this.health <= 0) {
            this.setVelocityY(-300)
            this.setTint(0xff0000);
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
        }
    }

    takesHit(source) {
        source.deliversHit(this);
        this.hurtEffect(20)
    }

    meleeWeapon() {
        this.hurtEffect(30)
    }

    hurtEffect(damage) {
        this.health -= damage;
        const currentEnemy = this.texture.key;
    
        console.log(currentEnemy)
        this.anims.play(`${currentEnemy}-hurt`);
        this.once('animationcomplete', (animation) => {
            if (animation.key == `${currentEnemy}-hurt`) {
                this.anims.play(`${currentEnemy}`)
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
