import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-max-button',
  templateUrl: './max-button.component.html',
  styleUrls: ['./max-button.component.scss'],
})
export class MaxButtonComponent implements OnInit {
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
    this.angleChangeMaxButton.emit(this._angleMaxButton);
  }

  constructor() {}

  ngOnInit(): void {}
}
