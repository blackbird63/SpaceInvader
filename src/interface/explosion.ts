export class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene){
        super(scene, 0, 0, "explosion")
    }
    kill(){
        this.destroy();
    }
}