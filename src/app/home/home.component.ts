import { Component, OnInit } from '@angular/core';
import { Message } from './../color';

import { Color } from '../color';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  colorPack: Array<Color>;
  colors: Array<string>;
  playedPattern: Array<number> = new Array();
  selectedPattern: Array<number> = new Array();
  randomArray: Array<number>;
  yellow = '#faeb2b';
  red = '#d10000';
  green = '#11945d';
  blue = '#440fa7';
  color: Color = new Color();
  messages: Message;
  intervalId = 0;
  message = '';
  level = 1;
  counter = 0;
  currentSquare: number;
  previousSquare: number;
  currentLevel = 1;
  randomGenerated: number;
  disabled: boolean;
  constructor() {}
  ngOnInit() {
    this.colors = [this.yellow, this.red, this.green, this.blue];
    this.ShuffleColorPack();
    this.messages = new Message();
    this.messages.message = 'Play the Pattern';
  }
  clearTimer() {
    clearInterval(this.intervalId);
  }

  PlayGame() {
    console.log('Play Game!');
    this.disabled = true;
    this.ShuffleColorPack();
    setTimeout(() => {
      this.countDown();
    }, 500);
  }
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.level} level`;
  }

  /**
   * Plays A random pattern based on current level.
   */
  private countDown() {
    this.clearTimer();
    this.playedPattern = new Array();
    this.currentLevel = this.level;
    this.intervalId = window.setInterval(() => {
      console.log('level => ' + this.level);
      this.AnimateSquaresRandom();
      console.log('Played Pattern => ' + this.playedPattern);
    }, 1000);
  }

  AnimateSquaresRandom() {
    let y = Math.floor(Math.random() * 9) + 1;
    this.randomGenerated = y;
    console.log('Random => ' + y);
    if (
      this.previousSquare === y ||
      this.previousSquare - y === 4 ||
      (this.previousSquare - y === -4 ||
        this.previousSquare - y === 8 ||
        (this.previousSquare - y === -8 && y !== 0))
    ) {
      y = y + 1;
      console.log('New Random => ' + y);
    }
    if (this.level === 0) {
      this.message = 'Blast off!';
      this.level = this.currentLevel;
      this.colorPack[3].animate = false;
      this.colorPack[2].animate = false;
      this.colorPack[1].animate = false;
      this.colorPack[0].animate = false;
      this.stop();
      this.messages.message = 'Guess the pattern';
      return;
    } else if (this.level > 0) {
      if (y === 4 || y === 8) {
        this.colorPack[3].animate = true;
        this.colorPack[2].animate = false;
        this.colorPack[1].animate = false;
        this.colorPack[0].animate = false;
        this.playedPattern.push(4);
      } else if (y === 3 || y === 7) {
        this.colorPack[3].animate = false;
        this.colorPack[2].animate = true;
        this.colorPack[1].animate = false;
        this.colorPack[0].animate = false;
        this.playedPattern.push(3);
      } else if (y === 2 || y === 6 || y === 10) {
        this.colorPack[3].animate = false;
        this.colorPack[2].animate = false;
        this.colorPack[1].animate = true;
        this.colorPack[0].animate = false;
        this.playedPattern.push(2);
      } else if (y === 1 || y === 5 || y === 9) {
        this.colorPack[3].animate = false;
        this.colorPack[2].animate = false;
        this.colorPack[1].animate = false;
        this.colorPack[0].animate = true;
        this.playedPattern.push(1);
      }
    } else {
      if (this.level < 0) {
        this.level = this.currentLevel;
      } // reset
    }
    this.level -= 1;
    this.previousSquare = y;
  }
  /**
   * Called While Guessing the Played Pattern
   */
  SelectSquare(index) {
    console.log(index + 1);
    const c = index + 1;
    const l = this.playedPattern.length;
    if (this.playedPattern[this.counter] === c) {
      console.log('Correct!');
      this.selectedPattern.push(index + 1);
      this.counter++;
      console.log(this.counter);
      console.log(l);
    } else {
      console.log('Incorrect!!');
      this.messages.message = 'Incorrect!! Keep Trying';
      setTimeout(() => {
        this.messages.message = 'Play the pattern';
        this.disabled = false;
        this.level = 1;
        this.currentLevel = 1;
      }, 2000);
      console.log(this.playedPattern);
      console.log(this.selectedPattern);
    }
    this.CheckSelectedPatternValidity(l);
  }
  /**
   * Checks if the guesed pattern is correct
   * and level is incremented.
   *
   */
  CheckSelectedPatternValidity(l) {
    if (this.counter === l) {
      console.log(this.playedPattern);
      console.log(this.selectedPattern);
      if (
        JSON.stringify(this.playedPattern) ===
          JSON.stringify(this.selectedPattern) &&
        this.playedPattern.length !== 0 &&
        this.selectedPattern.length !== 0
      ) {
        // tslint:disable-next-line:quotemark
        this.messages.message = "Whoaa!! That's correct";
        if (this.level === 11) {
          console.log('Game Completed!');
          this.messages.message = 'You have Great Memory!!';
          this.level = 1;
          this.currentLevel = 1;
        }
        setTimeout(() => {
          this.messages.message = 'Play Next Level';
          this.level += 1;
          this.currentLevel += 1;
          this.counter = 0;
          this.selectedPattern = new Array();
          this.playedPattern = new Array();
          this.disabled = false;
        }, 1000);
      }
    }
  }
  /**
   * Color pattern is Shuffled every new Game.
   */
  ShuffleColorPack() {
    this.randomArray = new Array();
    this.colorPack = new Array();
    let counter = 4;
    for (let index = 0; index < counter; index++) {
      const y = Math.floor(Math.random() * 4);
      const i = this.randomArray.findIndex(item => item === y);
      if (i === -1) {
        const color: Color = new Color();
        color.background = this.colors[y];
        color.animate = false;
        this.colorPack.push(color);
        this.randomArray.push(y);
      } else {
        counter++;
      }
    }
  }
}
