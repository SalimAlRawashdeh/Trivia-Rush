const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  physics: {
    default: 'arcade',
    arcade: {}
  },
  scene: [GameScene]
};

const game = new Phaser.Game(config);
