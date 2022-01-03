import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { maxCircularSliderButtonDirective } from '../directives/max-button-directive';

@NgModule({
  imports: [CommonModule],
  declarations: [maxCircularSliderButtonDirective],
  exports: [maxCircularSliderButtonDirective],
})
export class MaxButtonSliderModule {}
