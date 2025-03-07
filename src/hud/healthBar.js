import Phaser from "phaser";

class HealthBar {
  constructor(scene, x, y, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setScrollFactor(0, 0);
    this.x = x;
    this.y = y;

    this.value = health;

    this.size = {
      width: 100 ,
      height: 10,
    };

    scene.add.existing(this.bar);
    this.draw();
  }

  draw() {
    this.bar.clear();
    //background bar 
    this.bar.fillStyle(0x522134);
    this.bar.fillRect(
      this.x,
      this.y,
      this.size.width,
      this.size.height
    );
   
    //  fill the bar with a color
    this.bar.fillStyle(0x436218);
    this.bar.fillRect(
      this.x,
      this.y,
      this.value,
      this.size.height
    );
  }

  update(health) {
    this.value = health;
    this.draw();
  }

}

export default HealthBar;
