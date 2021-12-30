import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularSliderModalComponent } from './circular-slider-modal.component';

describe('CircularSliderModalComponent', () => {
  let component: CircularSliderModalComponent;
  let fixture: ComponentFixture<CircularSliderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularSliderModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularSliderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
