import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindNewCourseComponent } from './find-new-course.component';

describe('FindNewCourseComponent', () => {
  let component: FindNewCourseComponent;
  let fixture: ComponentFixture<FindNewCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindNewCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindNewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
