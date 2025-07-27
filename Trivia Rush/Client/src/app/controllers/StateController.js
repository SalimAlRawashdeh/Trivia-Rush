import {TriviaQuestions} from "../data/TriviaQuestions";
import {Gem} from "../models/Gem";
import {Helper} from "../helper";

export class StateController {

    constructor(streamerController) {
        this.streamerController = streamerController;
        this.state = 'joining';
        this.stateChangeCb = () => {}
        this.gemsUpdateCb = () => {}
        this.gems = [];
        this.questionIndices = []
        this.initStreamer();
    }

    initStreamer() {
        this.streamerController.onConnected(() => {
            this.initState();
        })
        this.streamerController.onStateUpdate((state) => {
            this.changeState(state);
        })

        this.streamerController.onGemsUpdate((gemsData) => {
            let updatedGems = []
            gemsData.forEach(gemData => {
                updatedGems.push(Gem.fromJson(gemData));
            })
            this.gems = updatedGems;
            this.gemsUpdateCb()
        })
    }

    // 'joining', 'in-game', 'end'
    getState() {
        return this.state;
    }

    changeState(state) {
        if(state == this.state) {
            return;
        }
        if(['joining', 'in-game', 'end'].indexOf(state) == -1) {
            throw Error("unknown state: " + state);
        }
        this.state = state;
        this.streamerController.updateState(state)
        this.stateChangeCb(this.state);
    }

    onStateChange(stateChangeCb) {
        this.stateChangeCb = stateChangeCb;
    }

    onGemsUpdate(gemsUpdatecb) {
        this.gemsUpdateCb = gemsUpdatecb;
    }

    // Gem functions

    initState() {
        this.initQuestions()
        this.initGems();
    }

    initGems() {
        for(var i =0; i < 3; ++i){
            this.addGem(false);
        }
        this.sendGemsUpdate();
    }

    initQuestions() {

        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        var shuffleArray = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        for(var i = 0; i < TriviaQuestions.dataBase.length; ++i){
            this.questionIndices.push(i);
        }

        shuffleArray(this.questionIndices)

    }

    getGem(id) {
        return this.gems.find(gem => gem.id == id)
    }

    getGems() {
        return this.gems;
    }

    onGemsUpdate(cb) {
        this.gemsUpdateCb = cb;
    }


    removeGem(gem) {
        this.gems.splice(this.gems.indexOf(gem), 1);
        this.gemsUpdateCb();
        this.sendGemsUpdate();
    }

    addGem(pushToStreamer = true) {
        let gem = new Gem(Helper.uuidv4(),
            Phaser.Math.Between(20, 725),
            Phaser.Math.Between(10, 550),
            this.questionIndices.shift()
        )
        this.gems.push(gem);
        this.gemsUpdateCb();
        if(pushToStreamer) {
            this.sendGemsUpdate();
        }
    }

    sendGemsUpdate() {
        let gemsData = []
        this.gems.forEach(gem => {
            gemsData.push(gem.toJson())
        })
        this.streamerController.updateGems(gemsData)
    }

}
