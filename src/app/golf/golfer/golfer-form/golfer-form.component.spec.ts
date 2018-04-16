import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolferFormComponent } from './golfer-form.component';

describe('GolferFormComponent', () => {
  let component: GolferFormComponent;
  let fixture: ComponentFixture<GolferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
