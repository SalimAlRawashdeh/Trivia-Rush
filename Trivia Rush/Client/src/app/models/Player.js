import {GameController} from "../controllers/GameController";

export class Player {

    constructor(name, id, me = false) {
        this.name = name;
        this.id = id;
        this.x = null;
        this.y = null;
        this.score = 0;
        this.state = 'idle';
        this.me = me;
        this.moveCb = () => {}
    }

    isMe() {
        return this.me;
    }

    initPosition(x,y, state) {
        this.x = x;
        this.y = y;
        this.state = state;
    }

    move(x, y, state) {

        var hasChanged = this.x != x || this.y != y || this.state != state;

        if(!hasChanged) {
            return;
        }

        this.x = x;
        this.y = y;
        this.state = state;

        if(this.isMe()) {
            let playerController = GameController.get().getPlayerController();
            playerController.updateMyPlayer();
        }

        this.moveCb();

    }

    // Increments player scores 
    incrementScore() {
        this.setScore(this.score + 1)
        let playerController = GameController.get().getPlayerController();
        playerController.updateMyPlayer();
        // Ends game when a score of 5 is reached
        if(5 <= this.score) {
            GameController.get().getStateController().changeState('end')
        }
    }

    setScore(score){
        this.score = score;
    }

    onMove = (cb) => {
        this.moveCb = cb;
    }

    static fromJson(jsonData) {
        let player = new Player(jsonData.name, jsonData.id);
        player.move(jsonData.x, jsonData.y, jsonData.state);
        player.setScore(jsonData.score);
        return player
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            x: this.x,
            y: this.y,
            state: this.state,
            score: this.score
        }
    }

}