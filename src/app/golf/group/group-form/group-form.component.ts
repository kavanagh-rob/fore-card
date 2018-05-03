import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfDataService } from '../../shared/services/golf-data.service';
import { Round } from '../../models/round';
import {Golfer} from '../../models/golfer';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  constructor( private route: ActivatedRoute, private  golfDataService: GolfDataService) {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
    if ( !this.round.groups ) {
      this.round.groups = [];
    }
  }
  round: Round;
  groupInputValue = '';

  ngOnInit() {
  }

  updateGroups() {
  }

  addGroup(groupName) {
    const group: any = {};
    group.name = groupName.trim();
    if ((this.round.groups.indexOf(group.name) === -1)) {
      this.round.groups.push(group);
    }
    this.groupInputValue = '';
  }
  removeGroup(groupToDelete) {
    this.round.groups = this.round.groups.filter(
      group => group !== groupToDelete);
    }

  addGolferToGroup(golfer, selectedGroup) {
   golfer.group_id = selectedGroup;
  }

}
