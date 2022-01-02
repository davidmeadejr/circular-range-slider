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
  private _angle: any = 240;

  @Input()
  diameter: number = 200;

  @Input()
  get angle() {
    return this._angle;
  }

  @Output()
  angleChange = new EventEmitter<number>();

  set angle(deg: number) {
    this._angle = deg || 0;
    this.angleChange.emit(this._angle);
  }

  ngOnInit(): void {}
}
