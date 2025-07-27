import OtherPlayerSprite from "../views/sprites/OtherPlayerSprite";
import {Player} from "../models/Player";
import MyPlayerSprite from "../views/sprites/MyPlayerSprite";
import {GameController} from "./GameController";

export default class PlayerController {

    constructor(streamerController) {
        this.streamerController = streamerController;
        this.players = {}
        this.playerSprites = {}
        this.changePlayersCb = () => {};
        this.updatePlayersCb = () => {};
        this.initStreamer();
    }

    initStreamer() {
        this.streamerController.onPlayerUpdate((playersData) => {
            let state = GameController.get().getStateController().getState();
            if(state == 'joining') {
                this.recreateOtherPlayers(playersData); // in case a player left or joined
                Object.keys(playersData).forEach(playerId => {
                    let playerData = playersData[playerId];
                    this.players[playerId].initPosition(playerData.x, playerData.y, playerData.state);
                });
            } else if(state == 'in-game') {
                this.handleCaseIfPlayerLeftDuringGame(playersData);
                this.updatePlayersStateInGame(playersData)
            }
        })

    }

    handleCaseIfPlayerLeftDuringGame(playersData) {
        if(Object.keys(playersData).length == Object.keys(this.players).length) {
            return;
        }
        var leftPlayerId = null;
        Object.keys(this.players).forEach(playerId => {
            if(!playersData[playerId]) {
                leftPlayerId = playerId;
            }
        })
        this.removeOtherPlayer(leftPlayerId)
    }

    updatePlayersStateInGame(playersData) {
        Object.keys(playersData).forEach(playerId => {
            if(playerId != this.getMyPlayer().id) {
                let playerData = playersData[playerId];
                this.players[playerId].move(playerData.x, playerData.y, playerData.state);
                this.players[playerId].setScore(playerData.score);
            }
        })
        this.updatePlayersCb()
    }

    recreateOtherPlayers(playersData) {
        // when players are updated, recreate all other players
        var myPlayer = this.getMyPlayer()
        this.players = {};
        this.players[myPlayer.id] = myPlayer;
        Object.keys(playersData).forEach(playerId => {
            if(playerId != myPlayer.id) { // not my player
                let otherPlayer = Player.fromJson(playersData[playerId])
                this.players[otherPlayer.id] = otherPlayer;
            }
        })
        this.changePlayersCb();
    }

    onChangePlayers(cb) {
        this.changePlayersCb = cb;
    }

    onUpdatePlayers(cb) {
        this.updatePlayersCb = cb;
    }

    getPlayers() {
        return this.players;
    }

    getMyPlayer() {
        return Object.values(this.players).find(player => player.isMe());
    }

    updateMyPlayer() {
        this.streamerController.updatePlayer(this.getMyPlayer().toJson());
    }

    createPlayerSprites(scene){
        Object.values(this.players).forEach(player => {
            let playerSprite;
            if(player.isMe()) {
                playerSprite = new MyPlayerSprite(scene, player.x, player.y, 'PlayerSprite', player)
            } else {
                playerSprite = new OtherPlayerSprite(scene, 'PlayerSprite', player)
            }
            this.playerSprites[player.id] = playerSprite;
        })
    }

    getPlayerSprite(player) {
        return this.playerSprites[player.id];
    }

    addMyPlayer(player) {
        this.players[player.id] = player;
        this.changePlayersCb()
        this.streamerController.connect(player.toJson());
    }

    removeOtherPlayer(playerId) {
        this.playerSprites[playerId].deletePlayer();
        delete this.players[playerId];
    }



}