import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundUpdateComponent } from './round-update.component';

describe('RoundUpdateComponent', () => {
  let component: RoundUpdateComponent;
  let fixture: ComponentFixture<RoundUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
