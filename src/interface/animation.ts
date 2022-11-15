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
