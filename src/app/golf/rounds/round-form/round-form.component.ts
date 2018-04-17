import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../../shared/services/golf-data.service';
import {ViewChild} from '@angular/core';
import {Round} from '../../models/round';
import {Router} from '@angular/router';

@Component({
  selector: 'app-round-form',
  templateUrl: './round-form.component.html',
  styleUrls: ['./round-form.component.css']
})
export class RoundFormComponent implements OnInit {

  constructor(private golfDataService: GolfDataService, private router: Router) { }
  @ViewChild('courseList') courseList;
  @ViewChild('golferList') golferList;

  model: any = {};
  courses = '';
  golfers = '';

  ngOnInit() {
  }

  onSubmit() {
    const round_id = this.model.name + ':' + new Date().toISOString().split('T')[0];
    const round = new Round(round_id, this.courseList.selectedCourse, this.golferList.selectedGolfers);

    const data: any = {};
    data.item = round;
    this.golfDataService.putRound(data).then(res => { // Success
      this.router.navigate(['/rounds']);
    });
  }

}
