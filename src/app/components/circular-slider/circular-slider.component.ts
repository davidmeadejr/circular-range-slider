import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-circular-slider',
  templateUrl: './circular-slider.component.html',
  styleUrls: ['./circular-slider.component.scss'],
})
export class CircularSliderComponent implements OnInit {
  @Input()
  diameter: number = 200;

  ngOnInit(): void {}
}
