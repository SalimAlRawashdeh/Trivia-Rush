export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, playerName) {
        super(scene, x, y, texture, 'Player');
        scene.add.existing(this);
        this.nameText = scene.add.text (0, 0, playerName, { fill: '#FFFFFF' });
        this.nameText.setOrigin(0.5,0.5);
        this.setScale(3);
        this.preload();
    }

    updateNamePosition() {
        this.nameText.x = this.x;
        this.nameText.y = this.y - 35;
    }

    deletePlayer() {
        this.nameText.destroy();
        this.destroy();
    }

}
