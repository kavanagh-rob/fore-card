import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolferPageComponent } from './golfer-page.component';

describe('GolferPageComponent', () => {
  let component: GolferPageComponent;
  let fixture: ComponentFixture<GolferPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolferPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
