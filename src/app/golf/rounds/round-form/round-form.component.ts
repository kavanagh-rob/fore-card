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
    this.round_id = this.model.name.split(' ').join('-') + ':' + new Date().toISOString().split('T')[0];
    const round = new Round(this.round_id, this.courseList.selectedCourse, this.golferList.selectedGolfers);

    const data: any = {};
    data.item = round;
    data.table_name = 'Rounds';
    this.setupNewScoreCards();
    this.setupDefaultGroup(round);
    this.postLineupFlashUpdate();
    this.golfDataService.putRound(data).then(res => { // Success
      this.router.navigate(['/rounds']);
    });
  }

  setupNewScoreCards() {
    const self = this;
    this.golferList.selectedGolfers.forEach(function (golfer) {
      const scoreCardId =  self.round_id + '|' + golfer.golfer_id;
      const scoreCard = new ScoreCard(scoreCardId, golfer.golfer_id, golfer.name, self.round_id, [], []);
      const scorecardData = {item: scoreCard, table_name: 'ScoreCards'};
      self.golfDataService.putScorecard(scorecardData).then(res => { // Success
      });
    });
  }

  setupDefaultGroup(round) {
    if (this.golferList.selectedGolfers.length < 5) {
      const defaultGroupName = 'All-Players';
      round.groups = [{name: defaultGroupName }];
      round.golfers.forEach(function(golfer) {
        golfer.group_id = defaultGroupName;
      });
    }
  }

  postLineupFlashUpdate() {
    const data: any = {};
    data.table_name = 'FlashUpdates';
    data.item = this.getLineupUpdate();
    this.golfDataService.putFlashUpdates( data );
  }

  getLineupUpdate() {
    return {
      'update_id': 'lineup|' + this.round_id,
      'round_id': this.round_id,
      'type': 'lineup',
      'course' : this.courseList.selectedCourse.course_id,
      'playerList': this.getPlayerNames(),
      'date': Date.now()
    };
  }

  getPlayerNames() {
    const playerNames = [];
    this.golferList.selectedGolfers.forEach(function (golfer) {
      playerNames.push(golfer.name);
    });
    return playerNames;
  }

}
