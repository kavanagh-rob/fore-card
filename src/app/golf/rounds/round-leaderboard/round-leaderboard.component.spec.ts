import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundLeaderboardComponent } from './round-leaderboard.component';

describe('RoundLeaderboardComponent', () => {
  let component: RoundLeaderboardComponent;
  let fixture: ComponentFixture<RoundLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
