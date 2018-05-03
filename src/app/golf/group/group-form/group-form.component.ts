import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GolfDataService } from '../../shared/services/golf-data.service';
import { Round } from '../../models/round';
import {Golfer} from '../../models/golfer';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router, private  golfDataService: GolfDataService) {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
    if ( !this.round.groups ) {
      this.round.groups = [];
    }
  }
  round: Round;
  groupInputValue = '';

  ngOnInit() {
  }

  submitGroups() {
    if (this.round.groups && this.validateGroups()) {
      const roundData = {item: this.round, table_name: 'Rounds'};
      this.golfDataService.putRound(roundData);
      this.router.navigate(['../groupList'], { relativeTo: this.route });
    }
  }

  validateGroups() {
    const self = this;
    let isValidGroups = true;
    this.round.groups.forEach(function (group: any) {
      if ((self.getGroupLength(group.name) > 4)) {
        isValidGroups = false;
      }
    });
    return isValidGroups;
  }

  addGroup(groupName) {
    const group: any = {};
    group.name = groupName.trim();
    if ((group.name && this.round.groups.indexOf(group.name) === -1)) {
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

  getErrorBackground (group_id) {
    return (this.getGroupLength(group_id) <= 4) ? '' : 'red';
  }

  getGroupLength(group_id) {
    const groupSize = (this.round.golfers.filter(function(obj: Golfer) {
      return obj['group_id'] === group_id;
    }).length);
    return groupSize;
  }

  removeGolferFromGroup( golfer ) {
    golfer.group_id = undefined;
  }


}
