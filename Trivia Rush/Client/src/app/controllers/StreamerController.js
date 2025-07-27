import io from "socket.io-client";

export default class StreamerController {

    constructor() {
        this.socket = null;
        this.playerUpdateCb = () => {}
        this.gemsUpdateCb = () => {}
        this.stateUpdateCb = () => {}
        this.connectedCb = () => {}
    }

    connect(data) {

        this.socket = io('ws://' + location.hostname + ':3000', { transports : ['websocket'] });

        this.socket.on ('connect', () => {
            this.socket.emit('register', data);
        });

        this.socket.on('registered', (id) => {
            this.connectedCb()
        });

        this.socket.on('update-player', (data) => {
            this.playerUpdateCb(data);
        })

        this.socket.on('update-gems', (data) => {
            this.gemsUpdateCb(data);
        })

        this.socket.on('update-state', (data) => {
            this.stateUpdateCb(data);
        })

    }

    leave() {
        this.socket.disconnect();
    }

    updatePlayer(playerData) {
        this.socket.emit('update-player', playerData);
    }

    updateGems(gemsData) {
        this.socket.emit('update-gems', gemsData);
    }

    updateState(state) {
        this.socket.emit('update-state', state);
    }

    onPlayerUpdate(cb) {
        this.playerUpdateCb = cb;
    }

    onGemsUpdate(cb) {
        this.gemsUpdateCb = cb;
    }

    onStateUpdate(cb) {
        this.stateUpdateCb = cb;
    }

    onConnected(cb) {
        this.connectedCb = cb;
    }

}