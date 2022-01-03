import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { minCircularSliderButtonDirective } from '../directives/min-button-directive';

@NgModule({
  imports: [CommonModule],
  declarations: [minCircularSliderButtonDirective],
  exports: [minCircularSliderButtonDirective],
})
export class minButtonSliderModule {}
