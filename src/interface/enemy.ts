import { Animation } from './animation';
import { Explosion } from './explosion';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
      life = 0;

      constructor(
            scene: Phaser.Scene,
            x: number,
            y: number,
            z: Phaser.Textures.Texture
      ) {
            super(scene, x, y, z);
      }
      update(...args: any[]): void {
            if (this.y > 580) {
                  this.resetEnemyPosition(this);
            }
      }

      setlife(numberLife: number) {
            this.life = numberLife;
      }

      enemyHasLife(): boolean {
            return this.life > 1;
      }

      private resetEnemyPosition(enemy: Enemy) {
            enemy.y = 0;
            const randomX = Phaser.Math.Between(50, 750);
            enemy.x = randomX;
      }

      kill(explosion: Explosion) {
            if (explosion) {
                  explosion.setX(this.x);
                  explosion.setY(this.y);

                  if (!this.enemyHasLife()) {
                        explosion
                              .play('explosion')
                              .on('animationcomplete', () => explosion.kill());
                        this.destroy();
                  } else {
                        explosion.setScale(0.3);
                        explosion
                              .play('explosion')
                              .on('animationcomplete', () => explosion.kill());
                        this.life--;
                  }
            }
      }
}
