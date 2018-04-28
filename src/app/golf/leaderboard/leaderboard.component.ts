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
    console.log(this.route);
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
  }
  round;
  scorecards = [];

  ngOnInit() {
    this.golfDataService.getScorecardsForRound(this.round.round_id).then(res => { // Success
      this.scorecards = res.Items;
    });
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
