import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GolfDataService } from '../../shared/services/golf-data.service';
import { Round } from '../../models/round';
import {Golfer} from '../../models/golfer';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router,
    private  golfDataService: GolfDataService) {
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

  selectGroup(groupId) {
    this.router.navigate(['round/' + this.round.round_id + '/group/' + groupId]);
  }

  getWhatsappGroupUrl(groupId) {
    return this.sanitize('whatsapp://send?text=http://fore-card.s3-website-eu-west-1.amazonaws.com/round/' +
    this.round.round_id + '/group/' + groupId);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

}
