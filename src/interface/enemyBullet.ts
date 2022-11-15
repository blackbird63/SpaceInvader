export class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 'enemybullet');
    }
    update(...args: any[]): void {
        if (this.y < 30 || this.y > 570 || this.x < 30 || this.x > 770) {
              this.destroy();
        }
  }

    kill() {
        this.destroy();
    }
}