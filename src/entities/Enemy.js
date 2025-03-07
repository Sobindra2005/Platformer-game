import Phaser from "phaser";
import collidable from "../mixins/collidable";
import { getTimeStamps } from "../utils/functions";
import Projectiles from "../attacks/projectiles";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.init();
    this.initEvents();
    this.timeFromLastTurn = null;
    this.rayGraphics = this.scene.add.graphics({
      lineStyle: { width: 2, color: 0xaa00aa },
    });
    this.platformColliderLayer = null;
    this.health = 100;
    this.leftBodyWidth = 100;
    this.rightBodyWidth = 100;
    this.PlayerInZone = false;
    this.shortRangeLine = null;
    this.shortrange = false;
    this.setOrigin(0.5, 0.5);
    this.isAttacking = false;
    this.lastTimeAttack = 0;
    this.intialtexture = texture;
    this.EnemyProjectiles = new Projectiles(this.scene, "fireball");
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

  update(time) {
    if (!this.body) {
      return;
    }
    

    if (!this.isAttacking) {
      {
        this.intialtexture == "Enemy-1"
          ? this.setBodySize(30, 44).setOffset(2.5, 20)
          : this.setBodySize(30, 59);
      }
    }

    this.coordinateUpdate(this.rightDetector, "right");
    this.coordinateUpdate(this.leftDetector, "left");

    this.previousX = this.x;

    if (this.getBounds().bottom > this.scene.cameras.main.height) {
      this.scene.events.removeListener(
        Phaser.Scenes.Events.UPDATE,
        this.update,
        this
      );
      this.setActive(false);
      this.rayGraphics.clear();
      this.destroy();
      return;
    }

    const isOverlapping =
      this.scene.physics.overlap(this.player, this.leftDetector) ||
      this.scene.physics.overlap(this.player, this.rightDetector);

    this.PlayerInZone = isOverlapping;

    const shortRangeOverlapping = this.scene.physics.overlap(
      this.player,
      this.shortRangeLine
    );
    this.shortrange = shortRangeOverlapping;

    if (this.PlayerInZone) {
      this.setVelocityX(0);
      this.shortRangeLinePositionUpdate();
      this.EnemyAttack();
      return;
    }

    this.scene.physics.overlap(
      this.player,
      this.EnemyProjectiles,
      this.projectileCollideDetector,
      null,
      this
    );

    this.shortRange == null;

    this.patroling(time);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  LeftDetector() {
    this.leftDetector = this.scene.physics.add
      .sprite(this.x, this.y, null)
      .setBodySize(30, 10)
      .setAlpha(0)
      .refreshBody();
  }

  RightDetector() {
    this.rightDetector = this.scene.physics.add
      .sprite(this.x, this.y, null)
      .setBodySize(30, 10)
      .setAlpha(0)
      .refreshBody();
  }

  coordinateUpdate(body, direction) {
    const deltaX = this.x - this.previousX;
    const widthChange = Math.abs(deltaX) * 0.8;

    if (deltaX > 0) {
      if (direction === "right") {
        this.rightBodyWidth -= widthChange;
      } else {
        this.leftBodyWidth += widthChange;
      }
    } else if (deltaX < 0) {
      if (direction === "right") {
        this.rightBodyWidth += widthChange;
      } else {
        this.leftBodyWidth -= widthChange;
      }
    }

    const width =
      direction === "right" ? this.rightBodyWidth : this.leftBodyWidth;
    const offsetX = width / 2;

    if (direction === "right") {
      body.x = this.x + offsetX;
    } else {
      body.x = this.x - offsetX;
    }

    body.y = this.y;
    body.setBodySize(width, body.body.height).refreshBody();
  }

 

  PlayerInPlatformDetector(player) {
    this.player = player;
    this.scene.physics.add.overlap(
      player,
      this.leftDetector,
      OverlapFunction,
      null,
      this
    );
    this.scene.physics.add.overlap(
      player,
      this.rightDetector,
      OverlapFunction,
      null,
      this
    );

    function OverlapFunction() {
      this.PlayerInZone = true;

      if (!this.shortRangeLine) {
        this.createShortRangeBox();
        this.scene.physics.add.overlap(
          player,
          this.shortRangeLine,
          this.ShortRangeAttack,
          null,
          this
        );
      }
      this.EnemyAttack();

      if (this.x < player.x) {
        this.setFlipX(false);
      }
      if (this.x > player.x) {
        this.setFlipX(true);
      }
    }
  }

  createShortRangeBox() {
    this.shortRangeLine = this.scene.physics.add
      .sprite(this.x, this.y, null)
      .setBodySize(30, 10)
      .setAlpha(0)
      .refreshBody();
  }

  shortRangeLinePositionUpdate() {
    this.shortRangeLine.x = this.flipX
      ? this.x - this.width / 2
      : this.x + this.width / 2;
    this.shortRangeLine.y = this.y;
  }

  EnemyAttack() {
    if (this.shortrange && this.PlayerInZone) {
      // this.scene.physics.add.overlap(this.shortRangeLine, this.player, () => {
      //   if (!this.isAttacking) {
      //     this.isAttacking = true;
      //     this.playSwordAttackAnimation();
      //   }
      // });
    } else if (!this.shortrange && this.PlayerInZone) {
      this.LongRangeAttack();
    }
  }

  // playSwordAttackAnimation() {
  //   if (
  //     this.anims.isPlaying &&
  //     this.anims.currentAnim.key === `${this.texture.key}-attack` &&
  //     lastTimeAttack + 600 > getTimeStamps()
  //   ) {
  //     return;
  //   }

  //   this.lastTimeAttack = getTimeStamps();
  //   this.scene.time.delayedCall(1000, () => {
  //     this.isAttacking = false;
  //   });

  //   if (this.flipX) {
  //     {
  //       this.intialtexture == "Enemy-1"
  //         ? this.setBodySize(40, this.body.height).setOffset(19, 20)
  //         : this.setBodySize(30, this.body.height).setOffset(19, 5);
  //     }
  //   } else {
  //     {
  //       this.intialtexture == "Enemy-1"
  //         ? this.setBodySize(40, this.body.height).setOffset(0, 20)
  //         : this.setBodySize(30, this.body.height).setOffset(19, 5);
  //     }
  //   }

  //   this.once("animationcomplete", () => {
  //     this.isAttacking = false;
  //     this.anims.play(`${this.intialtexture}`, true);
  //     this.setTexture(`${this.intialtexture}`);
  //   });
  // }

  LongRangeAttack() {
    if (this.lastTimeAttack + 600 < getTimeStamps()) {
      this.lastTimeAttack = getTimeStamps();
      this.scene.time.delayedCall(1000, () => {
        const velocity = this.flipX
          ? -this.player.Attackvelocity
          : this.player.Attackvelocity;
        this.EnemyProjectiles.FireProjectile(this, velocity, "fireball");
      });
    }
  }

  patroling(time) {
    if (!this.body || !this.body.onFloor()) {
      return;
    }

    const { ray, hasHit } = this.raycast(
      this.body,
      this.platformColliderLayer,
      45,
      3
    );

    this.setVelocityX(this.speed);

    if (!hasHit && this.timeFromLastTurn + 100 < time) {
      this.speed = -this.speed;
      this.setVelocityX(this.speed);
      this.timeFromLastTurn = time;
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
      this.rayGraphics.strokeLineShape(ray).setAlpha(0);
    }
  }

  createPlatformCollider(platformCollider) {
    this.platformColliderLayer = platformCollider;
  }

  meleeWeaponAttack() {
    if (this.health <= 0) {
      this.setVelocityY(-300);
      this.setTint(0xff0000);
      this.body.checkCollision.none = true;
      this.setCollideWorldBounds(false);
    }
  }

  takesHit(source) {
    this.mySound = this.scene.sound.add('hit');
    this.mySound.play();
    source.deliversHit(this);
    this.hurtEffect(20);
  }

  meleeWeapon() {
    this.hurtEffect(30);
  }

  hurtEffect(damage) {
    this.health -= damage;

    const currentEnemy = this.texture.key;

    this.anims.play(`${currentEnemy}-hurt`);
    this.once(
      "animationcomplete",
      (animation) => {
        if (animation.key == `${currentEnemy}-hurt`) {
          this.anims.play(`${currentEnemy}`);
        }
      },
      this
    );
    if (this.health <= 0) {
      this.setVelocityY(-300);

      this.setTint(0xff0000);
      this.body.checkCollision.none = true;
      this.setCollideWorldBounds(false);
    }
  }
}

export default Enemy;
