import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinButtonComponent } from './min-button.component';

describe('MinButtonComponent', () => {
  let component: MinButtonComponent;
  let fixture: ComponentFixture<MinButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
