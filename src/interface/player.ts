import { playerPositionX, playerPositionY } from './assets';


export class Player {
    static create(scene: Phaser.Scene): Phaser.Physics.Arcade.Sprite {
        let player =  scene.physics.add.sprite(playerPositionX, playerPositionY, 'player');
        player.setScale(0.5);
        player.setCollideWorldBounds(true);
        player.play('player_anim');
        return player;
    }
}