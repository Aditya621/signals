import { Component, computed, effect, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

// Signals are primitives, so we can use them outside the component class also

const newValue = signal(100);

// uncomment
//  setInterval(() => {
//    newValue.update((v) => v-1)
//  }, 1000)

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <!-- <h1> {{ name }} Signal!</h1> -->
    <!-- <div>
      count {{countvalue}}
    </div>
    <div>
      <button (click)="inc()">inc</button>
      <button (click)="dec()">dec</button>
      <button (click)="reset()">reset</button>
    </div> -->

    <!-- With Signal -->

    <div>
      Count : {{count()}}
    </div>
    <div>
      Double : {{double()}}
    </div>
    <div>
      <button (click)="incSignalValue()">inc</button>
      <button (click)="decSignalValue()">dec</button>
      <button (click)="resetSignalValue()">reset</button>
    </div>
  `,
})
export class App {
  name = 'Angular';
  constructor() {
    effect(() => {
      console.log('MyValue changed', newValue());
    });
  }
  // without signal
  public countvalue = 0;

  public inc() {
    this.countvalue++;
  }

  public dec() {
    if (this.countvalue > 0) this.countvalue--;
  }

  public reset() {
    this.countvalue = 0;
  }

  // with signal : Signals are primitives, so we can use them outside the component class also

  public count = signal(0);

  public double = computed(() => this.count() * 2);

  public incSignalValue() {
    this.count.update((c) => c + 1);
  }

  public decSignalValue() {
    if (this.count() > 0) this.count.update((c) => c - 1);
  }

  public resetSignalValue() {
    this.count.set(0);
  }
}

bootstrapApplication(App);
