import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../../shared/services/golf-data.service';
import {ViewChild} from '@angular/core';
import {Round} from '../../models/round';
import {Router} from '@angular/router';
import {ScoreCard} from '../../models/scoreCards';

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
  round_id;

  ngOnInit() {
  }

  onSubmit() {
    this.round_id = this.model.name + ':' + new Date().toISOString().split('T')[0];
    const round = new Round(this.round_id, this.courseList.selectedCourse, this.golferList.selectedGolfers);

    const data: any = {};
    data.item = round;
    data.table_name = 'Rounds';
    this.setupNewScoreCards();
    this.golfDataService.putRound(data).then(res => { // Success
      this.router.navigate(['/rounds']);
    });
  }
  setupNewScoreCards() {
    const self = this;

    this.golferList.selectedGolfers.forEach(function (golfer) {
      const scoreCardId =  self.round_id + '|' + golfer.golfer_id;
      const scoreCard = new ScoreCard(scoreCardId, golfer.golfer_id, self.round_id, [], []);
      const scorecardData = {item: scoreCard, table_name: 'ScoreCards'};
      self.golfDataService.putScorecard(scorecardData).then(res => { // Success
      });
    });

  }

}
