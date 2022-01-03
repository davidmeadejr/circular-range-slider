import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-max-button',
  templateUrl: './max-button.component.html',
  styleUrls: ['./max-button.component.scss'],
})
export class MaxButtonComponent implements OnInit {
  /*
   * Creates an input property called diameterMaxButton and assigns it a type number with a value of 200.
   * Which then binds to diameter property found in the maxCircularSliderButtonDirective.
   * Then dynamically assigns the value of the diameter calculated in the minButtonPosition function.
   * Found in the minCircularSliderButtonDirective.
   */
  @Input()
  diameterMaxButton: number = 200;

  /*
   * Creates an input property called maxButtonCurrentPosition and assigns it a value of 140.
   * Which then two way binds to the angle property found in the maxCircularSliderButtonDirective.
   * Then dynamically updates the position of the max button when it is dragged.
   * Along with updating the numerical value calculated in the dragMove function
   * Found in the maxCircularSliderButtonDirective.
   */
  @Input()
  maxButtonCurrentPosition: any = 140;

  constructor() {}

  ngOnInit(): void {}
}
