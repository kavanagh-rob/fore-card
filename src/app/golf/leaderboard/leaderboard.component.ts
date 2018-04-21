import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}
  round ;

  ngOnInit() {
    this.round = this.route.snapshot.data['resolvedRound'].Item;
  }

}
