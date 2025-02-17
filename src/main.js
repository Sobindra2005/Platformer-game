import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { Preload } from './scenes/Preload';
const parentDiv = document.getElementById("game-container");

const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;

const MAP_WIDTH = 1600
const ZOOM_FACTOR = 2

const SHARED_CONFIG = {
    mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
    width: WIDTH,
    height: HEIGHT,
    zoomFactor: ZOOM_FACTOR,

}

const Scenes = [Preload,
    Game,
    GameOver];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)


const config = {
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: initScenes()
};

export default new Phaser.Game(config);
