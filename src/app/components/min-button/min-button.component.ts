import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-min-button',
  templateUrl: './min-button.component.html',
  styleUrls: ['./min-button.component.scss'],
})
export class MinButtonComponent implements OnInit {
  /*
   * Creates an input property called diameterMinButton and assigns it a type number with a value of 200.
   * Which then binds to diameter property found in the minCircularSliderButtonDirective.
   * Then dynamically assigns the value of the diameter calculated in the minButtonPosition function.
   * Found in the minCircularSliderButtonDirective.
   */
  @Input()
  diameterMinButton: number = 200;

  /*
   * Creates an input property called minButtonCurrentPosition and assigns it a value of 220.
   * Which then two way binds to the angle property found in the minCircularSliderButtonDirective.
   * Then dynamically updates the position of the min button when it is dragged.
   * Along with updating the numerical value calculated in the dragMove function
   * Found in the minCircularSliderButtonDirective.
   */
  @Input()
  minButtonCurrentPosition: any = 220;

  constructor() {}

  ngOnInit(): void {}
}
