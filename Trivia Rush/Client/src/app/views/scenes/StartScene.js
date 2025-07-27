import {GameController} from "../../controllers/GameController";
import {Player} from "../../models/Player";
import {Helper} from "../../helper";

export default class StartScene extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    create () {
        this.enterName();
    }

    enterName() {

        var textFontSettings = { font: '32px Courier', fill: '#ffffff' };
        var nameFontSettings = { font: '32px Courier', fill: '#ffff00' };
        var label1 = this.add.text(10, 10, 'Enter your name:', textFontSettings);
        var label2 = this.add.text(10, 60, 'Once done, press Enter to continue', textFontSettings);
        let nameText = this.add.text(335, 10, '', nameFontSettings);

        this.input.keyboard.on('keydown', event =>
        {
            var keyCode = event.keyCode;

            var delKey = keyCode == 8;
            var enterKey = keyCode == 13;
            var allowedKey =  (keyCode >= 48 && keyCode < 90);

            if (delKey && nameText.text.length > 0) {
                nameText.text = nameText.text.substr(0, nameText.text.length - 1);
            }

            if (allowedKey) {
                nameText.text += event.key.toUpperCase();
            }

            if(enterKey && nameText.text != "") {
                this.input.keyboard.removeAllListeners('keydown')
                this.name = nameText.text;
                nameText.destroy()
                label1.destroy();
                label2.destroy();
                this.addPlayer()
            }

        });
    }

    addPlayer() {

        this.textSprite = this.add.text (100, 100, "");

        let playerController = GameController.get().getPlayerController();

        playerController.onChangePlayers(() => {
            this.renderPlayerList();
        })

        var name = this.name;

        let myPlayer = new Player(name, Helper.uuidv4(), true);

        playerController.addMyPlayer(myPlayer);

        GameController.get().getStateController().onStateChange((state) => {
            if(state == 'in-game') {
                this.scene.start('Game');
            }
        })

    }

    renderPlayerList () {

        let players = GameController.get().getPlayerController().getPlayers();

        var names = "";

        Object.values(players).forEach(player => {
            names += "Player: " + player.name + " joined ..\n\n"
        })

        this.textSprite.text = names;

    }

}