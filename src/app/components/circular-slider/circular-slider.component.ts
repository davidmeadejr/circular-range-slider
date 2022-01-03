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
  private _angle: any = 220;

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

  private _angleMaxButton: any = 140;

  @Input()
  diameterMaxButton: number = 200;

  @Input()
  get angleMaxButton() {
    return this._angleMaxButton;
  }

  @Output()
  angleChangeMaxButton = new EventEmitter<number>();

  set angleMaxButton(deg: number) {
    this._angleMaxButton = deg || 0;
    this.angleChangeMaxButton.emit(this._angle);
  }

  ngOnInit(): void {}
}
