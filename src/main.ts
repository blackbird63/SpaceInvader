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
      bulletTime = 0;
      round = 1;
      firingTimer = 0;
      starfield: Phaser.GameObjects.TileSprite;
      player: Phaser.Physics.Arcade.Sprite;
      enemiesManager: EnemiesManager;
      meteorite: Phaser.Physics.Arcade.Sprite;
      cursors: Phaser.Types.Input.Keyboard.CursorKeys;
      restartKey: Phaser.Input.Keyboard.Key ;
      

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
            this.load.spritesheet('bullet', 'assets/images/bullet1.png', {
                  frameWidth: 40,
                  frameHeight: 40,
            });
            this.load.image('enemybullet', 'assets/images/enemyBullet.png');

            this.load.spritesheet('explosion', "assets/images/explosion.png", {
                frameWidth: 128,
                frameHeight: 128,
            });
      }

      create() {
            console.log(this.scene.scene);
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
            
            // enemy and meteorite
            this.scoreManager = new ScoreManager(this);

            this.enemiesManager = new EnemiesManager(this);
            this.restartKey = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            );

            this.restartKey.on("down", () => {
                switch (this.state) {
                    case GameState.Win:
                        this.nextLevel();
                        console.log(this.scene.scene);
                        break;
                    case GameState.GameOver:
                        this.restart();
                        console.log(this.scene.scene);
                        break;
                }
            })
            
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
            
            let bullet : Bullet = this.assetManager.bullets.get();
            bullet.shoot(this.player.x, this.player.y - 50);
            bullet.play('bullet_anim');

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



      private bulletHitEnemy(bullet: Bullet, enemy: Enemy){
        let explosion: Explosion = this.assetManager.explosions.get();
        bullet.kill();
        enemy.kill(explosion);
        
        this.scoreManager.increaseScore();
        if (!this.enemiesManager.hasEnemyAlive) {
            this.scoreManager.increaseScore(1000);
            this.scoreManager.setWinText(this.round);
            this.state = GameState.Win;
        }
      }

      private enemyHitPlayer(player, enemy: Enemy) {
        let explosion: Explosion = this.assetManager.explosions.get();
        enemy.kill(explosion);
        let live: Phaser.GameObjects.Sprite = this.scoreManager.lives.getFirstAlive();
        if (live) {
            live.setActive(false).setVisible(false);
        }

        explosion.setPosition(this.player.x, this.player.y);
        explosion.play("explosion").on("animationcomplete", () => explosion.kill());
        
        if (this.scoreManager.noMoreLives) {
            this.scoreManager.setGameOverText();
            this.assetManager.gameOver();
            this.state = GameState.GameOver;
            this.player.disableBody(true, true);
        }
        if (!this.enemiesManager.hasEnemyAlive) {
            this.scoreManager.setWinText(this.round);
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
        let enemyBullet: EnemyBullet = this.assetManager.enemyBullets.get();
        let randomEnemy = this.enemiesManager.getRandomEnemy();
        if (enemyBullet && randomEnemy || enemyBullet && randomEnemy != undefined) {
            enemyBullet.setPosition(randomEnemy.x, randomEnemy.y);
            this.physics.moveToObject(enemyBullet, this.player, 200);
            this.firingTimer = this.time.now + 2000 - this.round * 100;
        }
    }

    private enemyBulletHitPlayer(player, enemyBullet: EnemyBullet) {
        let explosion: Explosion = this.assetManager.explosions.get();
        enemyBullet.kill();
        let live: Phaser.GameObjects.Sprite = this.scoreManager.lives.getFirstAlive();
        if (live) {
            live.setActive(false).setVisible(false);
        }

        explosion.setPosition(this.player.x, this.player.y);
        explosion.play("explosion").on("animationcomplete", () => explosion.kill());
        
        if (this.scoreManager.noMoreLives) {
            this.scoreManager.setGameOverText();
            this.assetManager.gameOver();
            this.state = GameState.GameOver;
            this.player.disableBody(true, true);
        }
        if (!this.enemiesManager.hasEnemyAlive) {
            this.scoreManager.setWinText(this.round);
            this.state = GameState.Win;
        }
    }

    restart() {
      this.scene.restart();
      //   this.round = 1;
      //   this.state = GameState.Play;
      //   this.player.enableBody(true, this.player.x, this.player.y, true, true);
      //   this.scoreManager.resetLives();
      //   this.scoreManager.hideText();
      //   this.scoreManager.setHighScore();
      //   this.enemiesManager.reset(1);
      //   this.assetManager.reset();
    }
    nextLevel() {
      
        this.round += 1;
        this.state = GameState.Play;
        this.player.enableBody(true, this.player.x, this.player.y, true, true);
        this.scoreManager.resetLives();
        this.scoreManager.hideText();
        this.scoreManager.increaseRound();
        this.enemiesManager.reset(this.round);
        this.assetManager.reset();
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
