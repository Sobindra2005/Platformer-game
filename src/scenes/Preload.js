import { Scene } from 'phaser';

export class Preload extends Scene {
    constructor() {
        super('Preload');
    }


    Environment() {
        this.load.tilemapTiledJSON('map', '/crystal.tmj');
        this.load.image('tiles1', '/assets/main_lev_build_1.png');
        this.load.image('tiles2', '/assets/main_lev_build_2.png')
        this.load.image('sky', '/assets/background_0.png')
        this.load.image('background', '/assets/background01_blue.png')

        for (let i = 1; i <= 2; i++) {
            this.load.image(`snowball-${i}`, `/assets/weapons/iceball_00${i}.png`)
        }

        for (let i = 1; i <= 3; i++) {
            this.load.image(`snowBall-${i}`, `/assets/weapons/iceball_impact_00${i}.png`)
        }

        for (let i = 1; i <= 3; i++) {
            this.load.image(`fireball-${i}`, `/assets/weapons/improved_fireball_00${i}.png`)
        }

        for (let i = 1; i <= 3; i++) {
            this.load.image(`fireballImpact-${i}`, `/assets/weapons/improved_fireball_impact_00${i}.png`)
        }


        this.load.spritesheet('throwAttack', '/assets/player/throw_attack_sheet_1.png', {
            frameWidth: 32,
            frameHeight: 38,
            spacing: 32

        })

        this.load.spritesheet('hit-effect', '/assets/weapons/hit_effect_sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
      
        })


        this.load.spritesheet('PlayerMovement', '/assets/player/move_sprite_1.png', {
            frameWidth: 33,
            frameHeight: 38,
            spacing: 31

        })

        this.load.spritesheet('swordAttack', '/assets/player/attacks_sheet.png', {
            frameWidth: 50,
            frameHeight: 38,
            spacing: 14
        })
        this.load.spritesheet('slideSheet', '/assets/player/slide_sheet_copy.png', {
            frameWidth: 32,
            farameHeight: 38,
            spacing: 32
        })

        this.load.spritesheet('Enemy-2', '/assets/enemy/enemy_sheet_2.png', {
            frameWidth: 32,
            frameHeight: 64,
            spacing: 32
        })

        this.load.spritesheet('Enemy-1', '/assets/enemy/enemy_sheet.png', {
            frameWidth: 32,
            frameHeight: 64,
            spacing:32
        })

        this.load.spritesheet('Enemy-2-attack', '/assets/enemy/enemy_sheet_2.png', {
            frameWidth: 64,
            frameHeight: 64,

        })
        
        this.load.spritesheet('Enemy-1-attack', '/assets/enemy/enemy_sheet.png', {
            frameWidth: 64,
            frameHeight: 64,
   
        })

    }

    preload() {
        this.Environment();
    }

    create() {
        this.scene.start('Game')
    }

}
