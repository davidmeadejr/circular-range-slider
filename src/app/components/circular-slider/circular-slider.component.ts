import { Component, OnInit } from '@angular/core';

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
    /*
     * Circular slider setup
     */
    $('#circularSlider').roundSlider({
      radius: 125,
      width: 30,
      sliderType: 'range',
      value: '0,100',
      circleShape: 'pie',
      startAngle: '315',
      svgMode: true,
      pathColor: '#8eb2c7',
      rangeColor: '##4386a3',
      handleShape: 'round',
      lineCap: 'round',
      borderWidth: 0,
    });
  }
}
