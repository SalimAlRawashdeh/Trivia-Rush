import Phaser from 'phaser';
import GameScene from './app/views/scenes/GameScene';
import EndScene from './app/views/scenes/EndScene';
import StartScene from './app/views/scenes/StartScene';
import BeforeStartScene from './app/views/scenes/BeforeStartScene';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: [BeforeStartScene, StartScene, GameScene, EndScene]
};

const game = new Phaser.Game(config);
