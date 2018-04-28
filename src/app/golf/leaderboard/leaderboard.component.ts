import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfDataService } from '../shared/services/golf-data.service';
import {Golfer} from '../models/golfer';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor( private route: ActivatedRoute, private  golfDataService: GolfDataService) {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
  }
  round;
  scorecards = [];
  accordianOpened = -1 ;

  ngOnInit() {
    this.golfDataService.getScorecardsForRound(this.round.round_id).then(res => { // Success
      this.scorecards = res.Items;
    });
  }

  toggleAccordian (index) {
    this.accordianOpened = this.accordianOpened === index ? -1 : index;
 }

  getLastUpdatedHole(scorecard) {
    return scorecard.baseScores.length === 0 ? 'n/a' : scorecard.baseScores.length;
  }
  getStablefordScore(scorecard, index) {
    return scorecard.stablefordScores[index] ? scorecard.stablefordScores[index] : '';
  }
  getTotalStablefordScore(scorecard) {
    return scorecard.totalStablefordScore ? scorecard.totalStablefordScore : 'n/a';
  }

  getSelectedGolferName(golferId) {
      return this.getSelectedGolfer(golferId).name;
  }
  getSelectedGolfer(golferId) {
      return this.round.golfers.filter(function(obj: Golfer) {
        return obj['golfer_id'] === golferId;
      })[0];
    }

}
