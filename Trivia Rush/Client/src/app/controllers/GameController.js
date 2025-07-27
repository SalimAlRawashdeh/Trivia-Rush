import PlayerController from "./PlayerController";
import StreamerController from "./StreamerController";
import {StateController} from "./StateController";

export class GameController {

    static instance;

    constructor() {
        this.streamerController = new StreamerController();
        this.playerController = new PlayerController(this.streamerController);
        this.stateController = new StateController(this.streamerController)
    }

    static get() {
        if(GameController.instance == null) {
            GameController.instance = new GameController();
        }
        return GameController.instance;
    }

    getPlayerController() {
        return this.playerController;
    }

    getStreamerController() {
        return this.streamerController;
    }

    getStateController() {
        return this.stateController;
    }

}