import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GolfDataService} from '../../shared/services/golf-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './round-overview.component.html',
  styleUrls: ['./round-overview.component.css']
})
export class RoundOverviewComponent implements OnInit {

  constructor( private route: ActivatedRoute) {
    this.round = this.route.snapshot.data['resolvedRound'].Item;
  }
  round;

  ngOnInit() {
  }

}
