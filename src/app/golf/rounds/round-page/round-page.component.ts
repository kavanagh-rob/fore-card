import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../../shared/services/golf-data.service';


@Component({
  selector: 'app-round-page',
  templateUrl: './round-page.component.html',
  styleUrls: ['./round-page.component.css']
})
export class RoundPageComponent implements OnInit {

  constructor(private golfDataService: GolfDataService) { }
  rounds = '';
  loadData() {
    this.golfDataService.getAllGolfRounds().then(res => { // Success
      this.rounds = res.Items;
    });
  }

  ngOnInit() {
    this.loadData();
  }

}
