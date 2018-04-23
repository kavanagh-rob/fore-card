import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfDataService } from '../shared/services/golf-data.service';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor( private route: ActivatedRoute, private  golfDataService: GolfDataService) {
    this.round = this.route.snapshot.data['resolvedRound'].Item;
  }
  round;
  scorecards = [];

  ngOnInit() {
    this.golfDataService.getScorecardsForRound(this.round.round_id).then(res => { // Success
      this.scorecards = res.Items;
    });
  }

}
