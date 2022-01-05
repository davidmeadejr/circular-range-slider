import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxLineComponent } from './max-line.component';

describe('MaxLineComponent', () => {
  let component: MaxLineComponent;
  let fixture: ComponentFixture<MaxLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
