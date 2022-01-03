import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-slider',
  templateUrl: './circular-slider.component.html',
  styleUrls: ['./circular-slider.component.scss'],
})
export class CircularSliderComponent implements OnInit {
  /*
   * Creates an input property called diameter and assigns it a type number with a value of 200.
   * Which then binds to the ngStyle directive.
   * Then dynamically assigns the width and the height of the circle to 200px.
   */
  @Input()
  diameter: number = 200;

  constructor() {}

  ngOnInit() {}
}
