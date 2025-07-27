import Phaser from 'phaser';
import {TriviaQuestions} from "../../data/TriviaQuestions";

export default class TriviaScreen {
    constructor(scene, questionIndex, answerCb) {
        this.scene = scene;
        this.question = TriviaQuestions.dataBase[questionIndex]
        this.answerCb = answerCb;
    }

    start() {
        this.displayTrivia(this.question);
    }

    displayTrivia(indexOfQuestion) {

        this.question = indexOfQuestion.question;
        this.answers = indexOfQuestion.answer;

        this.background = this.scene.add.rectangle(370, 300, 740, 600, 0x000000);
        this.background.setAlpha(0.25);

        this.spritesContainer = this.scene.add.container(370, 100);

        this.questionBox = this.scene.add.rectangle(0, 40, 500, 100, 0x6666ff);
        this.questionBox.setAlpha(0.75);

        this.answerBox1 = this.scene.add.rectangle(-150, 140, 200, this.answers.length * 15, 0x8FDAFA);
        this.answerBox1.setAlpha(0.75);

        this.answerBox2 = this.scene.add.rectangle(150, 140, 200, this.answers.length * 15, 0x8FDAFA);
        this.answerBox2.setAlpha(0.75);

        this.answerBox3 = this.scene.add.rectangle(-150, 230, 200, this.answers.length * 15, 0x8FDAFA);
        this.answerBox3.setAlpha(0.75);

        this.answerBox4 = this.scene.add.rectangle(150, 230, 200, this.answers.length * 15, 0x8FDAFA);
        this.answerBox4.setAlpha(0.75);

        this.questionText = this.scene.add.text(-180, -10, this.question, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: this.questionBox.displayWidth - 20 }
        });

        Phaser.Display.Align.In.Center(this.questionText, this.questionBox);

        this.answerButton1 = this.scene.add.text(-180 + (0 % 2) * 300, 200 + Math.floor(0 / 2) * 50, this.answers[0], {
            fontSize: '18px',
            fill: '#ffffff',
            align: 'center'
        });

        this.answerBox1.setInteractive();
        this.answerBox1.on('pointerdown', () => {
            this.chosenAnswer(0, indexOfQuestion.correctAnswer);
        });

        Phaser.Display.Align.In.Center(this.answerButton1, this.answerBox1);

        this.answerButton2 = this.scene.add.text(-180 + (1 % 2) * 300, 200 + Math.floor(1 / 2) * 50, this.answers[1], {
            fontSize: '18px',
            fill: '#ffffff',
            align: 'center'
        });

        this.answerBox2.setInteractive();
        this.answerBox2.on('pointerdown', () => {
            this.chosenAnswer(1, indexOfQuestion.correctAnswer);
        });

        Phaser.Display.Align.In.Center(this.answerButton2, this.answerBox2);

        this.answerButton3 = this.scene.add.text(-180 + (2 % 2) * 300, 200 + Math.floor(2 / 2) * 50, this.answers[2], {
            fontSize: '18px',
            fill: '#ffffff',
            align: 'center'
        });

        this.answerBox3.setInteractive();
        this.answerBox3.on('pointerdown', () => {
            this.chosenAnswer(2, indexOfQuestion.correctAnswer);
        });

        Phaser.Display.Align.In.Center(this.answerButton3, this.answerBox3);

        this.answerButton4 = this.scene.add.text(-180 + (3 % 2) * 300, 200 + Math.floor(3 / 2) * 50, this.answers[3], {
            fontSize: '18px',
            fill: '#ffffff',
            align: 'center'
        });

        this.answerBox4.setInteractive();
        this.answerBox4.on('pointerdown', () => {
            this.chosenAnswer(3, indexOfQuestion.correctAnswer);
        });

        Phaser.Display.Align.In.Center(this.answerButton4, this.answerBox4);

        this.spritesContainer.add([
            this.questionBox,
            this.questionText,
            this.answerBox1,
            this.answerBox2,
            this.answerBox3,
            this.answerBox4,
            this.answerButton1,
            this.answerButton2,
            this.answerButton3,
            this.answerButton4,

        ]);

    }

    destroy() {
       this.spritesContainer.destroy(true);
       this.background.destroy();
    }

    chosenAnswer(answerPressed, correctAnswer) {

        if (answerPressed == correctAnswer) {
            this.isCorrect = true;
        } else {
            this.isCorrect = false;
        }

        this.questionText.setVisible(false);

        this.answerBox1.setVisible(false);
        this.answerBox2.setVisible(false);
        this.answerBox3.setVisible(false);
        this.answerBox4.setVisible(false);

        this.answerButton1.setVisible(false);
        this.answerButton2.setVisible(false);
        this.answerButton3.setVisible(false);
        this.answerButton4.setVisible(false);

        this.questionBox.setVisible(false);

        this.answerCb(this.isCorrect);

        return this.isCorrect;
    }

    bringToTop() {
        this.scene.children.bringToTop(this.background)
        this.scene.children.bringToTop(this.spritesContainer)
    }



}