import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGolferComponent } from './add-golfer.component';

describe('AddGolferComponent', () => {
  let component: AddGolferComponent;
  let fixture: ComponentFixture<AddGolferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGolferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGolferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
