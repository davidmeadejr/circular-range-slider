import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Observable, of, from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-circular-slider',
  templateUrl: './circular-slider.component.html',
  styleUrls: ['./circular-slider.component.scss'],
})
export class CircularSliderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  /*
   * Get the x, y window coordinates of a users mouse position.
   */
  getMouseCirclePosition() {
    document.addEventListener('mousemove', (event) => {
      let xMouseCoordinate = event.clientX;
      let yMouseCoordinate = event.clientY;
      let mouseWindowCoordinates = [xMouseCoordinate, yMouseCoordinate];
      console.log(mouseWindowCoordinates);
      // x window coordinate = 963
      // y window coordinate = 456
    });
  }

  /*
   * Get mouse position relative to the center of the circle
   */
  // mouseRelPosition() {
  //   document.addEventListener('mousemove', (event) => {
  //     let center = document.querySelector('div.inner-border');
  //     let rect = center!.getBoundingClientRect();
  //     let x = event.clientX - rect.left;
  //     let y = event.clientY - rect.top;
  //     let tanTheta = y / x;
  //     console.log(tanTheta);
  //   });
  // }

  /*
   * Gets the Angle of the users mouse relative to the center of center of the screen
   */
  mouseRelPosition() {
    document.addEventListener('mousemove', (event) => {
      let center = document.querySelector('div.inner-border');
      const w = center!.clientWidth / 2;
      const h = center!.clientHeight / 2;

      const x = event.clientX;
      const y = event.clientY;

      const deltaX = w - x;
      const deltaY = h - y;

      const rad = Math.atan2(deltaY, deltaX);

      let deg = Math.round(rad * (180 / Math.PI));

      if (deg < 0) {
        deg = (deg + 360) % 360;
      }
      console.log(deg);
    });
  }
}
