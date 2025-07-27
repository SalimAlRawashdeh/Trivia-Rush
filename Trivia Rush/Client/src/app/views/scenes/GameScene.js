import ScoreboardScreen from '../screens/ScoreboardScreen';
import PlayerSprite from '../../../assets/PlayerSprite.png';
import Floor from '../../../assets/floor.jpg';
import Gems from '../../../assets/gems.png';
import Scoreboard from '../../../assets/scoreboard.png';
import Wall from '../../../assets/wall.png';
import GemSpritesGroup from '../sprites/GemSpritesGroup';
import {GameController} from "../../controllers/GameController";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('floor', Floor);
        this.load.image('scoreboard', Scoreboard);
        this.load.image('MediumGem', Gems);
        this.load.image('wall', Wall);
        this.load.spritesheet('PlayerSprite', PlayerSprite, { frameWidth: 16, frameHeight: 16 });
    }

    create() {

        this.add.image(400, 340, 'floor').setScale(0.7);
        this.add.image(1000, 385, 'scoreboard').setScale(1.9);

        this.scoreboardController = new ScoreboardScreen(this);
        this.gemGroup = new GemSpritesGroup(this, this.scoreboardController);

        let playerController = GameController.get().getPlayerController();

        playerController.createPlayerSprites(this);

        this.myPlayerSprite = playerController.getPlayerSprite(playerController.getMyPlayer())

        GameController.get().getStateController().onStateChange((state) => {
            if(state == 'end') {
                this.scene.start('End');
            }
        })

    }

    update() {
        this.myPlayerSprite.update();
        this.gemGroup.update(this.myPlayerSprite);
    }


}
