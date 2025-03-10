import { Scene } from "phaser";
import Player from "../entities/player";
import Enemies from "../group/enemies";
import hitanims from "../Anims/hitanims";
import BirdAnims from "../Anims/BirdAnims";
import snakeAnims from "../Anims/snakeAnims";
import AttackAnims from "../Anims/AttackAnims";
import initAnims from "../Anims/playerAnims";

export class Game extends Scene {
  constructor(config) {
    super("Game");
    this.config = config;
    this.cursor = null;
    this.movementSpeed = 100;
    this.player = null;
    this.Bouncevelocity = 30;
    this.playerEnemyCollide = this.playerEnemyCollide.bind(this);
  }

  create() {
    this.bgMusic = this.sound.add("backgroundMusic");
    this.bgMusic.loop = true;
    this.bgMusic.play();
    this.initAnimation();
    this.Environment();
    this.setupFollowupCameraOn();
  }
update() {
  if(this.enemies)
  {
    console.log(this.enemies )
  }
  }

  initAnimation() {
    BirdAnims(this.anims);
    snakeAnims(this.anims);
    initAnims(this.anims);
    AttackAnims(this.anims);
    AttackAnims(this.anims);
    hitanims(this.anims);
  }

  Player(start) {
    if (this.player) {
      this.player.destroy();
    }
    this.player = new Player(this, start.x, start.y, "PlayerMovement")
      .setOrigin(0.5, 0.5)
      .refreshBody();
  }

  Environment() {
    const map = this.CreateMap();

    const Layer = this.CreateLayer(map);
    this.playerZone = this.getPlayerZones(Layer.playerZone);
    this.Player(this.playerZone.start);
    console.log(this.player)
    this.getEndZone(this.playerZone.end);
    const EnemySpawnZone = this.getEnemySpawnPosition(Layer.EnemyZone);

    this.enemies = new Enemies(this);
    this.enemyTypes = this.enemies.getTypes();
    this.SpawnRandomEnemy(EnemySpawnZone, Layer.platformLayer);

    this.PlayerCollider(this.player, {
      CollisionObjects: {
        platform: Layer.platformCollider,
      },
    });

    this.enemies.children.iterate((enemy) => {
      this.playerColliderWithProjectile(this.player, {
        CollisionObjects: {
          projectile: enemy.EnemyProjectiles,
        },
      });
    });

    this.enemies.children.iterate((enemy) => {
      enemy.PlayerInPlatformDetector(this.player);
      this.EnemyCollider(enemy, {
        CollisionObjects: {
          platform: Layer.platformCollider,
          player: this.player,
        },
      });
    });
  }

  SpawnRandomEnemy(EnemySpawnZone, platformCollider) {
    EnemySpawnZone.forEach((spawnPoint) => {
      const enemy = new this.enemyTypes[spawnPoint.type](
        this,
        spawnPoint.x,
        spawnPoint.y
      );
      enemy.createPlatformCollider(platformCollider);
      this.enemies.add(enemy);
    });
  }

  PlayerCollider(player, { CollisionObjects }) {
    player.addCollider(CollisionObjects.platform);
  }

  onWeaponHit(entity, source) {
    entity.takesHit(source);
  }

  onProjectileCollide(entity, source) {
    source.deliversHit(entity);
    entity.Hurt(10);
  }

  playerColliderWithProjectile(player, { CollisionObjects }) {
    player.addCollider(CollisionObjects.projectile, this.onProjectileCollide);
  }

  EnemyCollider(player, { CollisionObjects }) {
    player.addCollider(CollisionObjects.platform);
    if (CollisionObjects.player) {
      player.addCollider(CollisionObjects.player, this.playerEnemyCollide);
    }

    if (CollisionObjects.player && CollisionObjects.player.projectiles) {
      player.addCollider(CollisionObjects.player.projectiles, this.onWeaponHit);
      this.physics.add.overlap(
        player,
        CollisionObjects.player.projectiles,
        this.onWeaponHit
      );
    }
  }

  CreateMap() {
    const map = this.make.tilemap({ key: "map" });
    map.addTilesetImage("main_lev_build_1", "tiles1");
    map.addTilesetImage("main_lev_build_2", "tiles2");
    return map;
  }

  playerEnemyCollide(entity, source) {
    entity.TakeHit(source);
  }

  CreateLayer(map) {
    const tiles1 = map.getTileset("main_lev_build_1");
    const tiles2 = map.getTileset("main_lev_build_2");
    const platformCollider = map.createLayer("PlatformCollider", tiles1);
    const environmentLayer = map.createLayer("environment", tiles1);
    const platformLayer = map.createLayer("platform", [tiles1, tiles2]);
    const playerZone = map.getObjectLayer("playerZone");
    const EnemyZone = map.getObjectLayer("EnemyZone");
    platformCollider.setCollisionByProperty({ collision: true }, true);

    return {
      environmentLayer,
      platformLayer,
      platformCollider,
      playerZone,
      EnemyZone,
    };
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    const startZone = playerZones.find((zone) => zone.name === "StartZone");
    const endZone = playerZones.find((zone) => zone.name === "EndZone");

    if (!startZone || !endZone) {
      console.error("StartZone or EndZone not found in playerZonesLayer");
    }

    return {
      start: startZone,
      end: endZone,
    };
  }

  setupFollowupCameraOn() {
    const { height, width, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height);
    this.cameras.main
      .setBounds(0, 0, width + mapOffset, height)
      .setZoom(zoomFactor);

    this.cameras.main.startFollow(this.player);
  }

  getEndZone(end) {
    if (!end) {
      console.error("End zone is undefined");
      return;
    }

    const EndOfLevel = this.physics.add
      .sprite(end.x, end.y, "end")
      .setAlpha(0)
      .setSize(5, 50)
      .setOrigin(0.5, 1);

    const eofOverlap = this.physics.add.overlap(EndOfLevel, this.player, () => {
      eofOverlap.active = false;
    });
  }

  getEnemySpawnPosition(spawnZonesLayer) {
    const spawnZones = spawnZonesLayer.objects;
    return spawnZones;
  }
}
