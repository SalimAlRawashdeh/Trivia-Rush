import sky from '../../../assets/sky.jpg';
import title from '../../../assets/title.png';
import play from '../../../assets/play.png';
export default class BeforeStartScence extends Phaser.Scene {

    constructor() {
        super('BeforeStart');
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('title', title);
        this.load.image('play', play);
    }

    create() {
        this.add.image(500, 300, 'sky').setScale(0.56);
        this.add.image(500, 200, 'title').setScale(0.5);
        this.play = this.add.image(500, 400, 'play').setScale(0.4);

        this.play.setInteractive();
        this.play.on('pointerdown', function () {
            this.scene.scene.start('Start');
        });
    }

    update() {

    }

}