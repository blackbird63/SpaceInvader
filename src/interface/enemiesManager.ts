import { Enemy } from './enemy';
import { GameParams } from './assets';

export class EnemiesManager {
      enemies: Phaser.Physics.Arcade.Group;
      enemyNumber = 0;

      get hasEnemyAlive(): boolean {
            return this.enemies.children.size > 0 || this.enemyNumber > 0;
      }
      get EnemiesCount(): boolean {
            return this.enemies.children.size > 0;
      }

      constructor(private _scene: Phaser.Scene) {
            this.enemies = this._scene.physics.add.group({
                  max: 0,
                  classType: Enemy,
                  runChildUpdate: true,
            });
            this.enemies.setOrigin(0, 0);
            this.createEnemies(1);
      }

      getRandomEnemy(): Enemy {
            let random = Phaser.Math.RND.integerInRange(
                  0,
                  this.enemies.children.size
            );
            let enemies = this.enemies.children.getArray() as Enemy[];
            return enemies[random];
      }

      reset(round: number) {
            this._scene.time.removeAllEvents();
            this.enemies.clear(true, true);
            this.enemyNumber = 5 + round * 2;
            this.createEnemies(round);
      }

      private createEnemies(round: number) {
            this.enemies.clear(true, true);
            this.enemyNumber = 5 + round * 2;
            // enemy1
            this._scene.time.addEvent({
                  delay: 3000,
                  callback: () => {
                        let randomX = Phaser.Math.Between(
                              50,
                              GameParams.width - 50
                        );
                        let enemy1: Enemy = this.enemies.create(
                              randomX,
                              0,
                              'enemy1'
                        );
                        enemy1.setlife(round);
                        enemy1.setScale(0.75);
                        enemy1.play('enemy1_anim');
                        enemy1.setVelocityY(Phaser.Math.Between(50, 100));
                        enemy1.setImmovable(true);
                        this.enemyNumber -= 1;
                  },
                  callbackScope: this,
                  repeat: 1 + round,
            });
            // Meteorite
            this._scene.time.addEvent({
                  delay: 8000,
                  callback: () => {
                        let randomX = Phaser.Math.Between(
                              0,
                              GameParams.width - 50
                        );
                        let meteorite: Enemy = this.enemies.create(
                              randomX,
                              0,
                              'meteorite'
                        );
                        meteorite.setlife(round);
                        meteorite.setScale(Phaser.Math.Between(3, 6) / 10);
                        meteorite.setVelocityY(Phaser.Math.Between(50, 200));
                        meteorite.setVelocityX(Phaser.Math.Between(-50, 50));
                        meteorite.setImmovable(true);
                        this.enemyNumber -= 1;
                  },
                  callbackScope: this,
                  repeat: 0,
            });
            // Enemy2
            this._scene.time.addEvent({
                  delay: 2000,
                  callback: () => {
                        let randomX = Phaser.Math.Between(
                              50,
                              GameParams.width - 50
                        );
                        let enemy2: Enemy = this.enemies.create(
                              randomX,
                              0,
                              'enemy2'
                        );
                        enemy2.setlife(round);
                        enemy2.setScale(0.3);
                        enemy2.play('enemy1_anim');
                        let randomY2 = Phaser.Math.Between(50, 100);
                        let randomX2 = Phaser.Math.Between(-50, 50);
                        enemy2.setVelocityY(randomY2);
                        enemy2.setVelocityX(randomX2);
                        enemy2.setRotation(randomX2 - randomY2);
                        enemy2.play('enemy2_anim');
                        enemy2.setImmovable(true);
                        this.enemyNumber -= 1;
                  },
                  callbackScope: this,
                  repeat: 1 + round,
            });
      }
}
