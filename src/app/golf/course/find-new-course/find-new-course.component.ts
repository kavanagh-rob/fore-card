import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../../shared/services/golf-data.service';
import { Router } from '@angular/router';
import { CourseSearchTypeEnum } from '../../models/courseSearchTypeEnum';
import { ScrapedCourse } from '../../models/scrapedCourse';

@Component({
  selector: 'app-find-new-course',
  templateUrl: './find-new-course.component.html',
  styleUrls: ['./find-new-course.component.css']
})
export class FindNewCourseComponent implements OnInit {

  constructor(private golfDataService: GolfDataService, private router: Router) { }
  courseId;
  searchTypeOptions = [CourseSearchTypeEnum.name, CourseSearchTypeEnum.city];
  selectedSearchType: CourseSearchTypeEnum  = CourseSearchTypeEnum.name;
  searchValue = '';
  foundCourses;
  ngOnInit() {
  }

  onSubmit() {
    if (this.searchValue !== '') {
      const data: any = {};
      data.searchValue = this.searchValue;
      data.searchType = this.selectedSearchType;
      this.golfDataService.searchCourses(data).then(res => { // Success
        this.foundCourses = res.courses;
      });
      }
  }

  selectCourse(course) {
    const data: any = {};
    data.courseInfo = new ScrapedCourse(course.courseId, course.name, course.city,
      course.country, course.lat.toString(), course.lng.toString(), course.thumbnail);

    data.courseId = course.courseId.toString();
    data.searchValue = this.searchValue;
    this.golfDataService.putCourse(data).then(res => { // Success
      this.router.navigate(['/courses']);
    });
  }

  manuallyAddCourse() {
    this.router.navigate(['/manualAddCourse']);
  }

}
