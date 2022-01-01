import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as $ from 'jquery';
import 'round-slider';

@Component({
  selector: 'app-circular-slider',
  templateUrl: './circular-slider.component.html',
  styleUrls: ['./circular-slider.component.scss'],
})
export class CircularSliderComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $('#slider5').roundSlider({
      radius: 110,
      width: 22,
      // handleSize: '+10',
      sliderType: 'range',
      value: '0,100',
    });
  }
}
