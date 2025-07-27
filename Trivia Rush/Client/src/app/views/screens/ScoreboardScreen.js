import {GameController} from "../../controllers/GameController";

export default class ScoreboardScreen {
    constructor(scene) {
        this.scene = scene;
        this.events = this.scene.events;
        this.init();
    }

    init() {
        this.scoreboardText = this.scene.add.text(840, 100, "", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.updateScoreboard();
        GameController.get().getPlayerController().onUpdatePlayers(() => {
            this.updateScoreboard();
        })
    }

    updateScoreboard() {
        var scoreText = "";
        Object.values(GameController.get().getPlayerController().getPlayers()).forEach(player => {
            scoreText += "Player " + player.name + " : " + player.score + "\n\n";
        })
        this.scoreboardText.text = scoreText;
    }

}