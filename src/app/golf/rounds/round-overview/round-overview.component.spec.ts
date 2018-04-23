import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundOverviewComponent } from './round-overview.component';

describe('RoundOverviewComponent', () => {
  let component: RoundOverviewComponent;
  let fixture: ComponentFixture<RoundOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
