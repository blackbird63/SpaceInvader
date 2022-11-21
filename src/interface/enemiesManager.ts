import { Enemy } from './enemy';
import { GameParams, round1 } from './assets';

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
            this.createEnemies();
      }

      getRandomEnemy(): Enemy {
            
            let enemies = this.enemies.children.getArray() as Enemy[];
            let enemiesFiltered = enemies.filter(enemy => enemy.y < 300 && (enemy.texture.key == 'enemy3' || enemy.texture.key == 'enemy5' || enemy.texture.key == 'enemy7' || enemy.texture.key == 'enemy8' || enemy.texture.key == 'enemy9' || enemy.texture.key == 'enemy10'));
            let random = Phaser.Math.RND.integerInRange(
                  0,
                  enemiesFiltered.length -1
            );
            return enemiesFiltered[random];
      }

      reset() {
            this._scene.time.removeAllEvents();
            this.enemies.clear(true, true);
            this.enemyNumber = 10 + round1 ;
            this.createEnemies();
      }

      private createEnemies() {
            this.enemies.clear(true, true);
            this.enemyNumber = 10 + round1;
            // enemy1
            this._scene.time.addEvent({
                  delay: 2000,
                  callback: () => {
                        let randomX = Phaser.Math.Between(
                              50,
                              GameParams.width - 50
                        );
                        let randomEnemy = Phaser.Math.Between(1, 10);
                        if (randomEnemy == 1 || randomEnemy == 2){
                              randomEnemy = 10;
                        }
                        let randomY = Phaser.Math.Between(50, 100);
                        let enemy: Enemy = this.enemies.create(
                              randomX,
                              0,
                              `enemy${randomEnemy}`
                        );
                        enemy.setlife(round1);
                        enemy.setVelocityY(randomY);
                        enemy.setImmovable(true);
                        this.enemyNumber -= 1;
                        enemy.play(`enemy${randomEnemy}_anim`);
                        let randomX2 = Phaser.Math.Between(-50, 50);
                        switch (`enemy${randomEnemy}`) {
                              case 'enemy1':
                                    enemy.setScale(0.5);
                                    break;
                              case 'enemy2':
                                    enemy.setScale(0.3);
                                    enemy.setRotation(randomX2 - randomY);
                                    enemy.setVelocityX(randomX2);
                                    break;
                              case 'enemy3':
                                    enemy.setScale(0.5);
                                    break;
                              case 'enemy4':
                                    enemy.setScale(0.5);
                                    break;
                              case 'enemy5':
                                    enemy.setScale(0.5);
                                    break;
                              case 'enemy6':
                                    enemy.setScale(0.5);
                                    break;
                              case 'enemy7':
                                    enemy.setScale(0.5);
                                    break;
                              case 'enemy8':
                                    enemy.setScale(0.5);
                                    break;
                              case 'enemy9':
                                    enemy.setScale(0.5);
                                    break;
                              case 'enemy10':
                                    enemy.setVelocityX(randomX2);
                                    enemy.setScale(0.3);
                                    break;
                        }
                  },
                  callbackScope: this,
                  repeat: 9 + round1,
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
                        meteorite.setlife(round1);
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
            // this._scene.time.addEvent({
            //       delay: 2000,
            //       callback: () => {
            //             let randomX = Phaser.Math.Between(
            //                   50,
            //                   GameParams.width - 50
            //             );
            //             let enemy2: Enemy = this.enemies.create(
            //                   randomX,
            //                   0,
            //                   'enemy2'
            //             );
            //             enemy2.setlife(round1);
            //             enemy2.setScale(0.3);
            //             let randomY2 = Phaser.Math.Between(50, 100);
            //             let randomX2 = Phaser.Math.Between(-50, 50);
            //             enemy2.setVelocityY(randomY2);
            //             enemy2.setVelocityX(randomX2);
            //             enemy2.setRotation(randomX2 - randomY2);
            //             enemy2.play('enemy2_anim');
            //             enemy2.setImmovable(true);
            //             this.enemyNumber -= 1;
            //       },
            //       callbackScope: this,
            //       repeat: 1 + round1,
            // });
      }
}
