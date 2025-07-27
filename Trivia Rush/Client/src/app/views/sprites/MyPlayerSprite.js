import {Player} from "../../models/Player";
import PlayerSprite from "./PlayerSprite";

export default class MyPlayerSprite extends PlayerSprite {

    constructor(scene, x, y, texture, player) {

        super(scene, x, y, texture, player.name);

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.player = player;
        this.player.move(this.x, this.y, 'idle');

    }


    preload() {
        this.scene.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers(this.texture.key, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(this.texture.key, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(this.texture.key, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers(this.texture.key, { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle',
            frames: [{ key: this.texture.key, frame: 1 }],
            frameRate: 20
        });

    }

    pause() {
        this.paused = true;
        this.setVelocityY(0)
        this.setVelocityX(0)
        this.anims.play('idle', true);
        this.player.move(this.x, this.y, 'idle');
    }

    resume() {
        this.paused = false;
    }

    update() {

        if(this.paused) {
            return;
        }

        let state = null;

        if (this.keyA.isDown) {
            this.setVelocityX(-160);
            state = 'left';
        } else if (this.keyD.isDown) {
            this.setVelocityX(160);
            state = 'right';
        } else if (this.keyW.isDown) {
            this.setVelocityY(-160);
            state = 'up';
        } else if (this.keyS.isDown) {
            this.setVelocityY(160);
            state = 'down';
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            state = 'idle';
        }

        if(this.player.x >= 712) {
            this.setVelocityX(Phaser.Math.Clamp(this.body.velocity.x, -Infinity, 0));
        }

        this.anims.play(state, true);

        this.player.move(this.x, this.y, state);

        this.updateNamePosition();

    }



}