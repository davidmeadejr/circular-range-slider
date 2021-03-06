import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InnerCircleComponent } from './components/inner-circle/inner-circle.component';
import { OuterCircleComponent } from './components/outer-circle/outer-circle.component';
import { MinButtonComponent } from './components/min-button/min-button.component';
import { MaxButtonComponent } from './components/max-button/max-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CircularSliderComponent } from './components/circular-slider/circular-slider.component';
import { CircularSliderModalComponent } from './components/circular-slider-modal/circular-slider-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { minButtonSliderModule } from './components/min-button-slider.module';
import { MaxButtonSliderModule } from './components/max-button-slider.module';
import { MinLineComponent } from './components/min-line/min-line.component';
import { MaxLineComponent } from './components/max-line/max-line.component';

@NgModule({
  declarations: [
    AppComponent,
    InnerCircleComponent,
    OuterCircleComponent,
    MinButtonComponent,
    MaxButtonComponent,
    CircularSliderComponent,
    CircularSliderModalComponent,
    FooterComponent,
    MinLineComponent,
    MaxLineComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    minButtonSliderModule,
    MaxButtonSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
