import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterCircleComponent } from './outer-circle.component';

describe('OuterCircleComponent', () => {
  let component: OuterCircleComponent;
  let fixture: ComponentFixture<OuterCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuterCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
