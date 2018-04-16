import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../shared/services/golf-data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor( private golfDataService: GolfDataService) {}
  title = 'Golf Scores';
  holes = '';
  loadData() {
    this.golfDataService.getAllGolfCourses().then(res => { // Success
      this.holes = res.Items;
      console.log(res.Items);
    });
  }

  ngOnInit() {
    this.loadData();
  }

}
