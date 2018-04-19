import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../shared/services/golf-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}
  course ;

  ngOnInit() {
    this.course = this.route.snapshot.data['resolvedRound'].Item;
  }

}
