import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxButtonComponent } from './max-button.component';

describe('MaxButtonComponent', () => {
  let component: MaxButtonComponent;
  let fixture: ComponentFixture<MaxButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
