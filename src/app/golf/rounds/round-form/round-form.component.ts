import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course';
import { Golfer } from '../../models/golfer';
import { GolfDataService } from '../../shared/services/golf-data.service';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-round-form',
  templateUrl: './round-form.component.html',
  styleUrls: ['./round-form.component.css']
})
export class RoundFormComponent implements OnInit {

  constructor(private golfDataService: GolfDataService) { }
  @ViewChild('courseForm') courseForm;

  courses = '';
  golfers = '';
  loadCourses() {

    this.golfDataService.getAllGolfCourses().then(res => { // Success
      this.courses = res.Items;
    });
  }
  // loadGolfers() {
  //   this.golfDataService.getAllGolfCourses().then(res => { // Success
  //     this.golfers = res.Items;
  //     console.log(res.Items);
  //   });
  // }

  ngOnInit() {
    console.log(this.courseForm);
    this.loadCourses();
    // this.loadGolfers();
  }

}
