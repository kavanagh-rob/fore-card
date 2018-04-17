import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGolferComponent } from './edit-golfer.component';

describe('EditGolferComponent', () => {
  let component: EditGolferComponent;
  let fixture: ComponentFixture<EditGolferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGolferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGolferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
