import { Bonus } from "./bonus";

export class BonusManager {
    allBonus: Phaser.Physics.Arcade.Group;

    constructor(private _scene : Phaser.Scene){
        this.allBonus = this._scene.physics.add.group({
            max: 0,
            classType: Bonus,
            runChildUpdate: true
        });
        this.allBonus.setOrigin(0, 0);
    }

    createBonus(positionBonusX : number, positionBonusY : number){
        let randomBonus: number = Phaser.Math.Between(1, 4)
        let bonus: Bonus = this.allBonus.create(
            positionBonusX,
            positionBonusY,
            `bonus${randomBonus}`
        );
        bonus.setScale(0.3);
        bonus.play(`bonus${randomBonus}_anim`);
        bonus.setVelocityY(100);
    }

    reset(){
        this.allBonus.clear(true, true);
    }
}