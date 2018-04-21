import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../../shared/services/golf-data.service';


@Component({
  selector: 'app-course-page',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private golfDataService: GolfDataService) { }
  selectedCourse;
  courses = '';
  loadData() {
    this.golfDataService.getAllGolfCourses().then(res => { // Success
      this.courses = res.Items;
    });
  }
  selectCourse(event: any, course: any) {
    this.selectedCourse = course;
  }


  ngOnInit() {
    this.loadData();
  }


}
