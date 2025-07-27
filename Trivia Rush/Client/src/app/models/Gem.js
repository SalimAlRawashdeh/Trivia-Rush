export class Gem {

    constructor(id, x, y, questionIndex) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.questionIndex = questionIndex;
    }

    static fromJson(jsonData) {
        let gem = new Gem(jsonData.id, jsonData.x, jsonData.y, jsonData.questionIndex);
        return gem
    }

    toJson() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            questionIndex: this.questionIndex
        }
    }

}