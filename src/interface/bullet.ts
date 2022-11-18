export class Bullet extends Phaser.Physics.Arcade.Sprite {
      constructor(scene: Phaser.Scene) {
            super(scene, 0, 0, 'bullet');
      }
        update(): void {
              if (this.y < 30) {
                    this.destroy();
              }
        }
      shoot(x: number, y: number) {
            this.setPosition(x, y);
            this.setVelocityY(-400);
            this.scene.sound.play('playerFire');
            this.play('bullet_anim');
      } 
      kill() {
            this.destroy();
      }
}
