import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.add
      .text(this.cameras.main.width /2 , this.cameras.main.height / 2, "Game Over ! Press Space to Restart ", {
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.scene.start("Preload");
    });

  }
}
