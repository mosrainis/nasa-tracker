import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  counter = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null
  }

  constructor() { }

  ngOnInit() {
    this.countDown(this.counter)
  }

  countDown(time) {
    let deadline = new Date("july 17, 2020 23:59:00").getTime();

    let x = setInterval( () => {
      let now = new Date().getTime();
      
      let t = deadline - now;
  
      this.counter.days = Math.floor(t / (1000 * 60 * 60 * 24));
      this.counter.hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
      this.counter.minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      this.counter.seconds = Math.floor((t % (1000 * 60)) / 1000);
    }, 1000);

  }

}
