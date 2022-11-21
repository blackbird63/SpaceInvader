import 'phaser';
import { AssetManager } from './interface/assetsManager';
import { Bullet } from './interface/bullet';
import { Animation } from './interface/animation';
import { Player } from './interface/player';
import { Explosion } from './interface/explosion';
import { Enemy } from './interface/enemy';
import { EnemiesManager } from './interface/enemiesManager';
import { ScoreManager } from './interface/scoreManager';
import { EnemyBullet } from './interface/enemyBullet';
import { Bonus } from './interface/bonus';
import { BonusManager } from './interface/bonusManager';
import {
      
      resetRound,
      nextRound,
      updatePlayerPosition,
      updateScore,
} from './interface/assets';

enum GameState {
      Play = 'play',
      GameOver = 'gameOver',
      Win = 'win',
}

class MainScene extends Phaser.Scene {
      state: GameState;
      assetManager: AssetManager;
      animation: Animation;
      scoreManager: ScoreManager;
      bonusManager: BonusManager;
      bulletTime = 0;
      round = 1;
      firingTimer = 0;
      starfield: Phaser.GameObjects.TileSprite;
      player: Phaser.Physics.Arcade.Sprite;
      enemiesManager: EnemiesManager;
      meteorite: Phaser.Physics.Arcade.Sprite;
      cursors: Phaser.Types.Input.Keyboard.CursorKeys;
      restartKey: Phaser.Input.Keyboard.Key;
      bonus2 = false;
      bonus3 = false;
      bonus3Time = 0;
      bonus4 = false;
      bonus4Time = 0;

      constructor() {
            super({
                  key: 'MainScene',
            });
      }
      preload() {
            this.load.image(
                  'spaceBackground',
                  'assets/images/backgroundSpace.png'
            );
            this.load.image('meteorite', 'assets/images/meteorite.png');

            this.load.spritesheet('player', 'assets/images/player.png', {
                  frameWidth: 100,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy1', 'assets/images/enemy1.png', {
                  frameWidth: 100,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy2', 'assets/images/enemy2.png', {
                  frameWidth: 100,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy3', 'assets/images/enemy3.png', {
                  frameWidth: 80,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy4', 'assets/images/enemy4.png', {
                  frameWidth: 80,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy5', 'assets/images/enemy5.png', {
                  frameWidth: 60,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy6', 'assets/images/enemy6.png', {
                  frameWidth: 60,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy7', 'assets/images/enemy7.png', {
                  frameWidth: 80,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy8', 'assets/images/enemy8.png', {
                  frameWidth: 60,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy9', 'assets/images/enemy9.png', {
                  frameWidth: 40,
                  frameHeight: 100,
            });
            this.load.spritesheet('enemy10', 'assets/images/enemy10.png', {
                  frameWidth: 60,
                  frameHeight: 100,
            });
            this.load.spritesheet('bullet', 'assets/images/bullet1.png', {
                  frameWidth: 40,
                  frameHeight: 40,
            });
            this.load.image('enemybullet', 'assets/images/enemyBullet.png');
            this.load.spritesheet('bonus1', 'assets/images/bonus1.png', {
                  frameWidth: 100,
                  frameHeight: 200,
            });
            this.load.spritesheet('bonus2', 'assets/images/bonus2.png', {
                  frameWidth: 100,
                  frameHeight: 200,
            });
            this.load.spritesheet('bonus3', 'assets/images/bonus3.png', {
                  frameWidth: 100,
                  frameHeight: 200,
            });
            this.load.spritesheet('bonus4', 'assets/images/bonus4.png', {
                  frameWidth: 200,
                  frameHeight: 200,
            });

            this.load.spritesheet('explosion', 'assets/images/explosion.png', {
                  frameWidth: 128,
                  frameHeight: 128,
            });

            this.sound.volume = 0.5;
            this.load.audio(
                  'soundExplosion',
                  'assets/sounds/explosionsound.mp3'
            );
            this.load.audio('playerFire', 'assets/sounds/playerfire.mp3');
      }

      create() {
            // Backgroud
            this.state = GameState.Play;
            this.starfield = this.add
                  .tileSprite(0, 0, 1800, 1200, 'spaceBackground')
                  .setOrigin(0, 0);

            this.assetManager = new AssetManager(this);
            this.animation = new Animation(this);

            //For the player
            this.player = Player.create(this);
            this.cursors = this.input.keyboard.createCursorKeys();
            this.bonusManager = new BonusManager(this);

            // enemy and meteorite
            this.scoreManager = new ScoreManager(this);

            this.enemiesManager = new EnemiesManager(this);

            this.restartKey = this.input.keyboard.addKey(
                  Phaser.Input.Keyboard.KeyCodes.SPACE
            );

            this.restartKey.on('down', () => {
                  switch (this.state) {
                        case GameState.Win:
                              this.nextLevel();
                              nextRound();
                              break;
                        case GameState.GameOver:
                              this.restart();
                              break;
                  }
            });
      }

      update() {
            this.starfield.tilePositionY -= 1;
            this.playerKeyboardHandler();
            if (this.time.now > this.firingTimer) {
                  this.enemyFires();
            }

            this.physics.add.collider(
                  this.assetManager.bullets,
                  this.enemiesManager.enemies,
                  this.bulletHitEnemy,
                  null,
                  this
            );
            this.physics.add.collider(
                  this.player,
                  this.enemiesManager.enemies,
                  this.enemyHitPlayer,
                  null,
                  this
            );
            this.physics.add.collider(
                  this.player,
                  this.assetManager.enemyBullets,
                  this.enemyBulletHitPlayer,
                  null,
                  this
            );
            this.physics.add.collider(
                  this.player,
                  this.bonusManager.allBonus,
                  this.playerTakeBonus,
                  null,
                  this
            );

            if (this.bonus3 && this.bonus3Time < this.time.now) {
                  this.player.setScale(0.5);
                  this.bonus3 = false;
            }
      }

      // Mouvement du vaisseau
      private playerKeyboardHandler() {
            let playerBody = this.player.body as Phaser.Physics.Arcade.Body;

            playerBody.setVelocity(0, 0);
            if (this.cursors.left.isDown) {
                  playerBody.setVelocityX(-400);
            } else if (this.cursors.right.isDown) {
                  playerBody.setVelocityX(400);
            } else if (this.cursors.up.isDown) {
                  playerBody.setVelocityY(-400);
            } else if (this.cursors.down.isDown) {
                  playerBody.setVelocityY(400);
            }
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                  this.fireBullet();
            }
      }

      // bullet
      private fireBullet() {
            if (!this.player.active) {
                  return;
            }
            // let bullet: Bullet = this.assetManager.bullets.get();
            // bullet.shoot(this.player.x, this.player.y - 50);

            let bullet: Bullet = this.assetManager.bullets.get();
            if (this.bonus4) {
                  let bullet2: Bullet = this.assetManager.bullets.get();
                  let bullet3: Bullet = this.assetManager.bullets.get();
                  bullet2.shoot(this.player.x + 10, this.player.y - 50);
                  bullet3.shoot(this.player.x - 10, this.player.y - 50);
                  if (this.bonus4Time < this.time.now) {
                        this.bonus4 = false;
                  }
            }

            bullet.shoot(this.player.x, this.player.y - 50);

            // if (this.time.now > this.bulletTime) {
            //       let bullet: Bullet = this.assetManager.bullets.get();
            //     //   let bullet2: Bullet = this.assetManager.bullets.get();
            //     //   let bullet3: Bullet = this.assetManager.bullets.get();
            //       if (bullet) {
            //             bullet.shoot(this.player.x, this.player.y - 50);
            //             // bullet2.shoot(this.player.x + 10, this.player.y - 50);
            //             // bullet3.shoot(this.player.x - 10, this.player.y - 50);
            //             // bullet.play('bullet_anim');
            //             // bullet2.play('bullet_anim');
            //             // bullet3.play('bullet_anim');
            //             this.bulletTime = this.time.now + 100;
            //       }
            // }
      }

      private bulletHitEnemy(bullet: Bullet, enemy: Enemy) {
            let explosion: Explosion = this.assetManager.explosions.get();
            bullet.kill();
            if (!enemy.enemyHasLife()) {
                  let random = Phaser.Math.Between(1, 3);
                  if (random == 1) {
                        this.bonusManager.createBonus(enemy.x, enemy.y);
                  }
            }

            enemy.kill(explosion);
            this.sound.play('soundExplosion');
            this.scoreManager.increaseScore();
            if (!this.enemiesManager.hasEnemyAlive) {
                  this.scoreManager.increaseScore(1000);
                  this.scoreManager.setWinText();
                  this.state = GameState.Win;
            }
      }

      private enemyHitPlayer(player, enemy: Enemy) {
            player;
            let explosion: Explosion = this.assetManager.explosions.get();
            let explosion2: Explosion = this.assetManager.explosions.get();

            enemy.kill(explosion);
            this.sound.play('soundExplosion');
            let live: Phaser.GameObjects.Sprite =
                  this.scoreManager.lives.getFirstAlive();
            if (live) {
                  live.setActive(false).setVisible(false);
            }
            //   this.player.disableBody(true, false);
            //   let timePause : Number = this.time.now + 200;
            //   if(timePause < this.time.now){
            //       this.player.disableBody(false, false);
            //   }
            explosion2.setPosition(this.player.x, this.player.y);
            explosion2
                  .play('explosion')
                  .on('animationcomplete', () => explosion.kill());
            if (this.scoreManager.noMoreLives) {
                  this.scoreManager.setGameOverText();
                  this.assetManager.gameOver();
                  this.state = GameState.GameOver;
                  this.player.disableBody(true, true);
            }
            if (!this.enemiesManager.hasEnemyAlive) {
                  this.scoreManager.setWinText();
                  this.state = GameState.Win;
            }
      }

      private enemyFires() {
            if (!this.player.active) {
                  return;
            }
            if (!this.enemiesManager.EnemiesCount) {
                  return;
            }
            let randomEnemy = this.enemiesManager.getRandomEnemy();
            if (randomEnemy){
                  var enemyBullet: EnemyBullet = this.assetManager.enemyBullets.get();
            }
            
            
            
            if (
                  (enemyBullet && randomEnemy) ||
                  (enemyBullet && randomEnemy !== undefined)
            ) {
                  enemyBullet.setPosition(randomEnemy.x, randomEnemy.y);
                  this.physics.moveToObject(enemyBullet, this.player, 200);
                  this.firingTimer = this.time.now + 2000 ;
            }
      }

      private enemyBulletHitPlayer(player, enemyBullet: EnemyBullet) {
            player;
            let explosion: Explosion = this.assetManager.explosions.get();
            enemyBullet.kill();
            let live: Phaser.GameObjects.Sprite =
                  this.scoreManager.lives.getFirstAlive();
            if (live) {
                  live.setActive(false).setVisible(false);
            }

            explosion.setPosition(this.player.x, this.player.y);
            explosion
                  .play('explosion')
                  .on('animationcomplete', () => explosion.kill());
            this.sound.play('soundExplosion');
            if (this.scoreManager.noMoreLives) {
                  this.scoreManager.setGameOverText();
                  this.assetManager.gameOver();
                  this.state = GameState.GameOver;
                  this.player.disableBody(true, true);
            }
            if (!this.enemiesManager.hasEnemyAlive) {
                  this.scoreManager.setWinText();
                  this.state = GameState.Win;
            }
      }

      private playerTakeBonus(player, bonus: Bonus) {
            player;
            let bonusName = bonus.texture.key;
            bonus.kill();
            let temp = this;
            let enemies =
                  this.enemiesManager.enemies.children.getArray() as Enemy[];
            switch (bonusName) {
                  // Bonus 1 : Nuclear bomb, kill all enemies on the screen
                  case 'bonus1':
                        enemies.forEach(function (enemy) {
                              enemy.setlife(1);
                              let explosion: Explosion =
                                    temp.assetManager.explosions.get();
                              enemy.kill(explosion);
                              temp.sound.play('soundExplosion');
                        });
                        if (this.scoreManager.noMoreLives) {
                              this.scoreManager.setGameOverText();
                              this.assetManager.gameOver();
                              this.state = GameState.GameOver;
                              this.player.disableBody(true, true);
                        }
                        if (!this.enemiesManager.hasEnemyAlive) {
                              this.scoreManager.setWinText();
                              this.state = GameState.Win;
                        }
                        break;
                  // Bonus 2 : kill with one shoot the enemies present on the screen when you take the bonus
                  case 'bonus2':
                        enemies.forEach(function (enemy) {
                              enemy.setlife(1);
                        });
                        break;
                  // Bonus 3 : downsize the ship player for 10 seconds
                  case 'bonus3':
                        this.bonus3 = true;
                        this.player.setScale(0.2);
                        this.bonus3Time = this.time.now + 10000;
                        break;
                  // Bonus 4 : upsize of bullets for 10 seconds
                  case 'bonus4':
                        this.bonus4 = true;
                        this.bonus4Time = this.time.now + 10000;
                        break;
            }
      }

      restart() {
            updatePlayerPosition(400, 600);
            updateScore(0);
            this.scene.restart();
            this.round = 1;
            resetRound();
            this.state = GameState.Play;
            this.player.enableBody(
                  true,
                  this.player.x,
                  this.player.y,
                  true,
                  true
            );
            this.scoreManager.resetLives();
            this.scoreManager.hideText();
            this.scoreManager.setHighScore();
            this.bonusManager.reset();
            this.enemiesManager.reset();
            this.assetManager.reset();
      }
      nextLevel() {
            this.round += 1;
            updatePlayerPosition(this.player.x, this.player.y);
            this.state = GameState.Play;
            this.player.enableBody(
                  true,
                  this.player.x,
                  this.player.y,
                  true,
                  true
            );
            this.bonusManager.reset();
            this.scoreManager.resetLives();
            this.scoreManager.hideText();
            this.scoreManager.increaseRound();
            this.enemiesManager.reset();
            this.assetManager.reset();
            this.scene.restart();
      }
}

const config: Phaser.Types.Core.GameConfig = {
      title: 'Space Invader',
      type: Phaser.AUTO,
      backgroundColor: 'rgb(32, 40, 32)',
      width: 800,
      height: 600,
      physics: {
            default: 'arcade',
            arcade: {
                  gravity: { y: 0 },
            },
      },
      scene: MainScene,
};

const game = new Phaser.Game(config);
game;
