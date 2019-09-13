import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ElementRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit, OnDestroy {
  @Input() color: any;
  intervalId = 0;
  message = '';
  seconds = 3;
  animateBlue: boolean;
  animateRed: boolean;
  animateGreen: boolean;
  animateYellow: boolean;
  clearTimer() {
    clearInterval(this.intervalId);
  }
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    // console.log(this.color);
    // this.start();
    console.log(this.color);
  }
  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    this.countDown();
  }
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      console.log(this.seconds);
      // this.colorPack[this.seconds].animate = true;
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
        this.stop();
      } else {
        if (this.seconds < 0) {
          this.seconds = 3;
        } // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
  highlightBox() {
    this.renderer.addClass(this.el.nativeElement, 'square-selected');
  }
}
