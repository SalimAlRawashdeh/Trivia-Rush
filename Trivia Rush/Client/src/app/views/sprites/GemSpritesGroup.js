import TriviaScreen from '../screens/TriviaScreen';
import {GameController} from "../../controllers/GameController";

export default class GemSpritesGroup {
    constructor(scene, scoreboardScreen) {
        this.scene = scene;
        this.spritesGroup = this.scene.add.group();
        this.score = 0;
        this.scoreboardScreen = scoreboardScreen;
        this.events = this.scene.events;
        this.stateController = GameController.get().getStateController();

        this.stateController.onGemsUpdate(() => {
            this.refreshGems();
        })

        this.init();
    }

    init() {
        this.refreshGems();
    }

    update(playerSprite) {
        this.spritesGroup.getChildren().forEach(gemSprite => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(playerSprite.getBounds(), gemSprite.getBounds())) {

                let gem = this.stateController.getGem(gemSprite.uid);
                playerSprite.pause();
                this.stateController.removeGem(gem);

                this.triviaScreen = new TriviaScreen(this.scene, gem.questionIndex, (isCorrect) => {
                    playerSprite.resume();
                    this.triviaScreen.destroy();
                    this.triviaScreen = null;
                    if (isCorrect == true) {
                        GameController.get().getPlayerController().getMyPlayer().incrementScore()
                    }
                });
                this.triviaScreen.start();

                this.generateGemWithDelay();

            }

        });

    }


    generateGemWithDelay() {
        this.scene.time.delayedCall(5 * 1000, () => {
            this.stateController.addGem()
        });
    }

    createGemSprite(gem) {
        const gemSprite = this.scene.add.image(
            gem.x,
            gem.y,
            'MediumGem'
        ).setScale(0.2);
        gemSprite.uid = gem.id;
        return gemSprite;
    }

    refreshGems() {
        this.spritesGroup.clear(false, true);
        this.stateController.getGems().forEach(gem => {
            var gemSprite = this.createGemSprite(gem);
            this.spritesGroup.add(gemSprite)
        })

        if(this.triviaScreen) {
            this.triviaScreen.bringToTop()
        }
    }

    checkOverlapWithPlayerAndGems(player) {
        const playerBounds = player.getBounds();
        for (const gem of this.spritesGroup.getChildren()) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, gem.getBounds())) {
                return gem;
            }
        }
        return null;
    }
}
