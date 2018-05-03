import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfDataService } from '../../shared/services/golf-data.service';
import { Round } from '../../models/round';
import {Golfer} from '../../models/golfer';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor( private route: ActivatedRoute, private  golfDataService: GolfDataService) {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
  }
  round: Round;

  ngOnInit() {
    this.round.groups =  this.round.groups || [];
  }

  getGolferGroup(golfer) {
    return golfer.group_id ? golfer.group_id : 'No Group Set';

  }

  playerHasNoGroupAssigned() {
    const groupSize = (this.round.golfers.filter(function(obj: Golfer) {
      return obj['group_id'] === undefined;
    }).length);
    return !(groupSize > 0);
  }

}
