export class Animation {
      constructor(private _scene: Phaser.Scene) {
            this.init();
      }

      private init() {
            this._scene.anims.create({
                  key: 'bullet_anim',
                  frames: this._scene.anims.generateFrameNumbers('bullet', {
                        start: 0,
                        end: 2,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });

            this._scene.anims.create({
                key: 'player_anim',
                frames: this._scene.anims.generateFrameNumbers('player', {
                      start: 0,
                      end: 1,
                }),
                frameRate: 20,
                repeat: -1,
          });

            this._scene.anims.create({
                  key: 'enemy1_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy1', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy2_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy2', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy3_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy3', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy4_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy4', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy5_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy5', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy6_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy6', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy7_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy7', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy8_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy8', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy9_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy9', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'enemy10_anim',
                  frames: this._scene.anims.generateFrameNumbers('enemy10', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'bonus1_anim',
                  frames: this._scene.anims.generateFrameNumbers('bonus1', {
                        start: 0,
                        end: 3,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'bonus2_anim',
                  frames: this._scene.anims.generateFrameNumbers('bonus2', {
                        start: 0,
                        end: 3,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'bonus3_anim',
                  frames: this._scene.anims.generateFrameNumbers('bonus3', {
                        start: 0,
                        end: 3,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'bonus4_anim',
                  frames: this._scene.anims.generateFrameNumbers('bonus4', {
                        start: 0,
                        end: 1,
                  }),
                  frameRate: 20,
                  repeat: -1,
            });
            this._scene.anims.create({
                  key: 'explosion',
                  frames: this._scene.anims.generateFrameNumbers('explosion', {
                        start: 0,
                        end: 15,
                  }),
                  frameRate: 24,
                  repeat: 0,
                  hideOnComplete: true,
            });
      }
}
