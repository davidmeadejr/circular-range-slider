import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinLineComponent } from './min-line.component';

describe('MinLineComponent', () => {
  let component: MinLineComponent;
  let fixture: ComponentFixture<MinLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
