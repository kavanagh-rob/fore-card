import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../golf-data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
