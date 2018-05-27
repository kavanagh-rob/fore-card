import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GolfDataService} from '../../shared/services/golf-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './round-update.component.html',
  styleUrls: ['./round-update.component.css']
})
export class RoundUpdateComponent implements OnInit {
  constructor( private route: ActivatedRoute, private golfDataService: GolfDataService) {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
    this.golfDataService.getFlashUpdatesPerRound(this.round.round_id).then(res => { // Success
      this.flashUpdates = res.Items;
    });
  }
  round;
  flashUpdates = [];
  commentBoxOpen = false;
  commentText;
  commentAlias = 'Shy golfer';

  ngOnInit() {
  }

  getUpdateTime(update) {
    const date = new Date(update.date);
    let timeString = this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
    if (update.type === 'lineup') {
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      timeString += ': ' + day + '/' + month + '/' + year;
    }
    return timeString;
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
          color = '#1462ac';
      }
      return color;
    }

    submitComment() {
      if (this.commentText) {
        const data: any = {};
        data.table_name = 'FlashUpdates';
        data.item = this.getCommentUpdate();
        this.golfDataService.putFlashUpdates( data );
        this.commentBoxOpen = false;
        this.commentText = null;
        this.commentAlias = 'Shy Golfer';
        location.reload();
      }
    }

    getCommentUpdate() {
      return {
        'update_id': 'comment|' + this.commentAlias + '|' + Date.now(),
        'round_id': this.round.round_id,
        'alias': this.commentAlias,
        'type': 'comment',
        'text': this.commentText,
        'date': Date.now()
      };
    }

    getUpdateTitle(update) {
      let result = '';
      if (update.type === 'flashscore') {
        result = update.flashScore.toUpperCase() + ' for ' + update.golfer.name;
      } else if (update.type === 'comment') {
        result = update.alias + ' commented';
      } else if (update.type === 'lineup') {
        result = 'Round Started in ' + update.course;
      }
      return result;
    }

    getUpdateText(update) {
      let result = '';
      if (update.type === 'flashscore') {
        result = 'Hole ' + update.hole;
      } else if (update.type === 'comment') {
        result = update.text;
      } else if (update.type === 'lineup') {
        result = 'Players: ' + JSON.stringify(update.playerList);
      }
      return result;
    }

}
