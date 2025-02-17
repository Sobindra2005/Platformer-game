import Phaser from "phaser";
import collidable from "../mixins/collidable";
import initAnims from '../Anims/playerAnims'
import Projectiles from "../attacks/projectiles";
import AttackAnims from "../Anims/AttackAnims";
import Projectile from "../attacks/Projectile";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        initAnims(this.scene.anims)
        AttackAnims(this.scene.anims)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.init();
        this.jumpcount = 0;
        this.lastShiftPressTime = 0;
        this.isBounceVelocity = 100;
        this.isEnemyColliding = false;
        this.Attackvelocity = 200;
        this.isThrowingBall = false
    }

    init() {
        this.playerSpeed = 120;
        this.body.setGravityY(1200);
        this.setCollideWorldBounds(true)
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.projectiles = new Projectiles(this.scene, 'fireball')
        this.initEvents();
        Object.assign(this, collidable)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }
    update() {

        this.BodySizeManage();
        if (this.isEnemyColliding) {
            return;
        }
        this.AnimationHandler();
    }

    BodySizeManage() {
        if (this.isSliding) {
            if (this.flipX) {
                this.setBodySize(42, 20)
                this.setOffset(20, 20)
            }
            else {
                this.setBodySize(42, 20)
                this.setOffset(0, 20)
            }
        }
        else {
            this.setBodySize(20, 47)
        }
    }


    AnimationHandler() {
        this.EventListener();
        this.RightClick();
        this.AnimationController();
    }

    projectile(texture) {
        if (this.isThrowingBall) return;
        this.isThrowingBall = true;
        this.once('animationcomplete', () => {
            const velocity = this.flipX ? -this.Attackvelocity : this.Attackvelocity
            this.projectiles.FireProjectile(this, velocity, texture)
            this.isThrowingBall = false;
        })
    }


    EventListener() {
        const { left, right, space, shift, A, D, Q, E } = this.cursor;
        const SpaceJustDown = Phaser.Input.Keyboard.JustDown(space)
        this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.Q = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.E = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        const currentTime = this.scene.time.now;

        if (Phaser.Input.Keyboard.JustDown(this.Q)) {
            this.projectile('fireball')
        }
        else if (Phaser.Input.Keyboard.JustDown(this.E)) {
            this.projectile('snowball')
        }

        if (shift.isDown && this.body.onFloor() && (currentTime - this.lastShiftPressTime > 3000)) {
            this.isSliding = true;
            this.lastShiftPressTime = currentTime;
        }
        else if (left.isDown || this.A.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        }
        else if (right.isDown | this.D.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
        }
        else {
            this.setVelocityX(0);
        }

        if (SpaceJustDown && (this.body.onFloor() || this.jumpcount < 2)) {
            this.hasJumped = true;
            this.setVelocityY(-400);
            this.jumpcount++;
        }

        if (this.body.blocked.down && this.jumpcount !== 0) {
            this.jumpcount = 0;
        }
    }

    AnimationController() {
        if (this.isThrowingBall) {
            this.playAnimation('throwAttack')
            this.once('animationcomplete', () => {
                this.isThrowingBall = false;
            })
        }
        else if (!this.body.onFloor()) {
            if (this.isAttacking) {
                this.playAnimation('sword-attack');
                this.once('animationcomplete', () => {
                    setTimeout(() => { this.isAttacking = false }, 400)

                });
            }
            return this.playAnimation('jump');
        }
        else if (this.isSliding) {
            this.setVelocityX(this.flipX ? -this.playerSpeed * 2 : this.playerSpeed * 2);
            this.playAnimation('slide');
            this.once('animationcomplete', () => {
                setTimeout(() => { this.isSliding = false }, 400)

            });
        }
        else if (this.body.velocity.x !== 0) {
            if (this.isAttacking) {
                return this.playAnimation('sword-attack');
            }
            return this.playAnimation('playerMovement');
        }
        else if (this.isAttacking) {
            this.playAnimation('sword-attack');
        }
        else {
            this.playAnimation('idle');
        }
    }

    TakeHit() {
        this.isEnemyColliding = true;
        this.body.touching.right ?
            this.setVelocityX(-this.isBounceVelocity)
            :
            this.setVelocityX(this.isBounceVelocity);

        this.anims.play('landing', true)

        this.scene.time.delayedCall(0, () => {
            this.setVelocityY(-this.isBounceVelocity - 100)
        });

        this.scene.time.delayedCall(1000, () => {
            this.isEnemyColliding = false;
            this.setVelocity(0)
            this.anims.stop()
        });


    }

    RightClick() {
        this.scene.input.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                this.isAttacking = true;
            }
        }, this);

        this.scene.input.on('pointerup', function (pointer) {
            if (!pointer.leftButtonDown()) {
                this.isAttacking = false;
            }
        }, this);
    }

    playAnimation(animKey) {

        if (this.anims.currentAnim?.key !== animKey) {
            this.anims.play(animKey, true);
        }
    }
}

export default Player;
