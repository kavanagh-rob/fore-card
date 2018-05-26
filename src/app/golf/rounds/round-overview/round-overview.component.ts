import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GolfDataService} from '../../shared/services/golf-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './round-overview.component.html',
  styleUrls: ['./round-overview.component.css']
})
export class RoundOverviewComponent implements OnInit {

  constructor( private route: ActivatedRoute, private golfDataService: GolfDataService) {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
    this.golfDataService.getFlashUpdatesPerRound(this.round.round_id).then(res => { // Success
      this.flashUpdates = res.Items;
    });
  }
  round;
  flashUpdates = [];

  ngOnInit() {
  }

  getUpdateTime(milisecs) {
    const date = new Date(milisecs);
    return this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
  }
  addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
  getUpdateColor(update) {
    let color;
      switch (update) {
        case 'bogie':
            color = 'yellow';
            break;
        case 'par':
            color = 'green';
            break;
        case 'birdie':
            color = 'orange';
            break;
        case 'eagle':
            color = 'red';
            break;
        case 'albatross':
            color = 'purple';
            break;
        default:
          color = 'yellow';
      }
      return color;
    }
}
