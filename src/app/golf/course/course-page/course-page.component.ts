import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../../shared/services/golf-data.service';


@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

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
