import { Component, OnInit } from '@angular/core';
import { GolfDataService } from '../../shared/services/golf-data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-round-page',
  templateUrl: './round-page.component.html',
  styleUrls: ['./round-page.component.css']
})
export class RoundPageComponent implements OnInit {

  constructor(private golfDataService: GolfDataService,  private router: Router) { }
  rounds = '';
  loadData() {
    this.golfDataService.getAllGolfRounds().then(res => { // Success
      this.rounds = res.Items;
    });
  }
  goToRound(roundId) {
    this.router.navigate(['/round/' + roundId]);
  }

  ngOnInit() {
    this.loadData();
  }

}
