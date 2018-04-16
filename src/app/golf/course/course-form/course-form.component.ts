import { Component, OnInit } from '@angular/core';
import {Hole} from '../../models/hole';
import {Course} from '../../models/course';
import { GolfDataService } from '../../shared/services/golf-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  holes = new Array<Hole>(18);
  hole1 = new Hole(null, null);
  hole2 = new Hole(null, null);
  hole3 = new Hole(null, null);
  hole4 = new Hole(null, null);
  hole5 = new Hole(null, null);
  hole6 = new Hole(null, null);
  hole7 = new Hole(null, null);
  hole8 = new Hole(null, null);
  hole9 = new Hole(null, null);
  hole10 = new Hole(null, null);
  hole11 = new Hole(null, null);
  hole12 = new Hole(null, null);
  hole13 = new Hole(null, null);
  hole14 = new Hole(null, null);
  hole15 = new Hole(null, null);
  hole16 = new Hole(null, null);
  hole17 = new Hole(null, null);
  hole18 = new Hole(null, null);

  parOptions = [3, 4, 5];
  indexOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];



  model = new Course('name', this.holes);
  totalPar = null;

  submitted = false;
  indexFormValid = true;
  parFormValid = true;

  constructor( private golfDataService: GolfDataService, private router: Router) {
    this.holes[0] = this.hole1;
    this.holes[1] = this.hole2;
    this.holes[2] = this.hole3;
    this.holes[3] = this.hole4;
    this.holes[4] = this.hole5;
    this.holes[5] = this.hole6;
    this.holes[6] = this.hole7;
    this.holes[7] = this.hole8;
    this.holes[8] = this.hole9;
    this.holes[9] = this.hole10;
    this.holes[10] = this.hole11;
    this.holes[11] = this.hole12;
    this.holes[12] = this.hole13;
    this.holes[13] = this.hole14;
    this.holes[14] = this.hole15;
    this.holes[15] = this.hole16;
    this.holes[16] = this.hole17;
    this.holes[17] = this.hole18;
  }

  ngOnInit() {
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  onSubmit() {
    this.validateForms();
    const data: any = {};
    data.item = this.model;
    this.golfDataService.putCourse(data).then(res => { // Success
      console.log('Course put success');
      this.router.navigate(['/course']);
    });
  }

  validateForms() {
    this.indexFormValid = true;
    this.parFormValid = true;
    let totalIndex = 0;
    this.holes.forEach(hole => {
        if (hole.index == null) {
              this.indexFormValid = false;
        } else {
          totalIndex = totalIndex + Number(hole.index);
        }
        if (hole.par == null) {
          this.parFormValid = false;
        }
    });
    if (this.indexFormValid && totalIndex !== 171) {
      this.indexFormValid = false;
    }
  }
}
