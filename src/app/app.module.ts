import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InnerCircleComponent } from './components/inner-circle/inner-circle.component';
import { OuterCircleComponent } from './components/outer-circle/outer-circle.component';
import { MinButtonComponent } from './components/min-button/min-button.component';
import { MaxButtonComponent } from './components/max-button/max-button.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CircularSliderComponent } from './components/circular-slider/circular-slider.component'

@NgModule({
  declarations: [
    AppComponent,
    InnerCircleComponent,
    OuterCircleComponent,
    MinButtonComponent,
    MaxButtonComponent,
    CircularSliderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
