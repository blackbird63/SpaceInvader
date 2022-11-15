export class Player {
    static create(scene: Phaser.Scene): Phaser.Physics.Arcade.Sprite {
        let player =  scene.physics.add.sprite(400, 600, 'player');
        player.setScale(0.75);
        player.setCollideWorldBounds(true);
        player.play('player_anim');
        return player;
    }
}