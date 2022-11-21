export class Bonus extends Phaser.Physics.Arcade.Sprite {
      constructor(
            scene: Phaser.Scene,
            x: number,
            y: number,
            z: Phaser.Textures.Texture
      ) {
            super(scene, x, y, z);
      }
      update(): void {
            if (this.y > 590) {
                  this.destroy();
            }
      }
      kill() {
            this.destroy();
      }
}
