import { Bullet } from "./bullet";
import { Explosion } from "./explosion";
import { EnemyBullet } from "./enemyBullet";

export class AssetManager {
    bullets: Phaser.Physics.Arcade.Group;
    explosions: Phaser.Physics.Arcade.Group;
    enemyBullets: Phaser.Physics.Arcade.Group;

    constructor(private _scene: Phaser.Scene){
        this.bullets = this.createBullets();
        this.enemyBullets = this.createEnemyBullets();
        this.explosions = this.createExplosions();
        
    }

    gameOver() {
        this.bullets.clear(true, true);
        this.enemyBullets.clear(true, true);
    }

    reset() {
        this.bullets.clear(true, true);
        this.enemyBullets.clear(true, true);
        this.createBullets();
        this.createEnemyBullets();
    }

    private createBullets(): Phaser.Physics.Arcade.Group {
        let bullets = this._scene.physics.add.group({
            max: 0,
            classType: Bullet,
            runChildUpdate: true
        });
        bullets.setOrigin(0.5, 1);
        return bullets;
    }
    private createEnemyBullets(): Phaser.Physics.Arcade.Group {
        let enemyBullets = this._scene.physics.add.group({
            max: 0,
            classType: EnemyBullet,
            runChildUpdate: true
        });
        // enemyBullets.setOrigin(0.5, 2);
        return enemyBullets;
    }

    private createExplosions(): Phaser.Physics.Arcade.Group {
        let explosions = this._scene.physics.add.group({
            max: 0,
            classType: Explosion,
            runChildUpdate: true
        });

        return explosions;
    }

}