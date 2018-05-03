import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfDataService } from '../../shared/services/golf-data.service';
import { Round } from '../../models/round';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  constructor( private route: ActivatedRoute, private  golfDataService: GolfDataService) {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
  }
  round: Round;

  ngOnInit() {
    this.round.groups =  this.round.groups || [];
  }

  updateGroups() {
    console.log(this.round.groups);
  }

  addGroup(groupName) {
    console.log(groupName);
    const group: any = {};
    group.name = groupName;
    this.round.groups.push(group);
  }
  removeGroup(groupToDelete) {
    this.round.groups = this.round.groups.filter(
      group => group !== groupToDelete);
    }

  addGolferToGroup() {
    console.log(this.round);
  }
}
