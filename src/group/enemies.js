import { Physics } from "phaser";
import { Enemy_type } from "../types";
import collidable from "../mixins/collidable";

class Enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene)
        Object.assign(this, collidable);
    }


    getTypes() {
        return Enemy_type
    }
}

export default Enemies