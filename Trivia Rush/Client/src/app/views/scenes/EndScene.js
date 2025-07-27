import {GameController} from "../../controllers/GameController";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super('End');
    }

    create () {

        let players = Object.values(GameController.get().getPlayerController().getPlayers())

        let scores = players.map(player => player.score);

        let maxScore = Math.max(...scores);

        let winner = players.find(player => player.score == maxScore);

        Math.max.apply(Math, players.map(function(o) { return o.score; }))

        this.add.text (100, 100, "PLAYER " + winner.name + " WON THE GAME!!");

        GameController.get().getStreamerController().leave();

    }
}