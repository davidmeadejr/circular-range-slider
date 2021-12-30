import { Component } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { OuterCircleComponent } from './components/outer-circle/outer-circle.component';
import { InnerCircleComponent } from './components/inner-circle/inner-circle.component';
import { MinButtonComponent } from './components/min-button/min-button.component';
import { MaxButtonComponent } from './components/max-button/max-button.component';
import { CircularSliderComponent } from './components/circular-slider/circular-slider.component';
import { CircularSliderModalComponent } from './components/circular-slider-modal/circular-slider-modal.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // Fade in content on page initialisation
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'circular-range-slider';
}
