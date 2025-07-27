import PlayerSprite from "./PlayerSprite";

export default class OtherPlayerSprite extends PlayerSprite {

    constructor(scene, texture, player) {
        super(scene, player.x, player.y, texture, player.name);
        this.player = player;
        this.player.onMove(() => {
            this.onMove();
        })
        this.onMove();
    }

    onMove() {
        if(this.player.x == null) { // ignore any nulls (as other player hasn't updated position yet)
            return;
        }

        this.x = this.player.x;
        this.y = this.player.y;
        this.anims.play(this.player.state, true);
        this.updateNamePosition();
    }

    preload() {

    }

}