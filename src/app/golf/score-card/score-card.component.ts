import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Golfer} from '../models/golfer';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  constructor( private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.golferId = params['golfer_id']);
  }
  round ;
  golfer;
  golferId;

  ngOnInit() {
    this.round = this.route.snapshot.data['resolvedRound'].Item;
    this.golfer = this.getSelectedGolfer();
    if (!this.golfer.scoreCard) {
      this.golfer.scoreCard = [];
    }
  }

  getSelectedGolfer() {
    const id =  this.golferId;
    if (this.golferId) {
      return this.round.golfers.filter(function(obj: Golfer) {
        return obj['golfer_id'] === id;
      })[0];
    }
  }
  getStableford(hole, number) {
    const adjustedPar = this.getAdjustedPar(hole);
    let points;
    if ( this.golfer.scoreCard[number] && this.golfer.scoreCard[number] > 0 && this.golfer.scoreCard[number] < adjustedPar + 2) {
      points = adjustedPar + 2 - this.golfer.scoreCard[number];
    }
    return points || '';
  }
  getAdjustedPar(hole) {
    const highIndexShots = Math.trunc(this.golfer.handicap / 18);
    const lowIndexShots = highIndexShots + 1;

    let numberOfLowerIndexShots = this.golfer.handicap % 18;
    let adjustedPar = hole.par;
    if ( this.golfer.handicap > 0 ) {
      numberOfLowerIndexShots = numberOfLowerIndexShots === 0 ? 18 : numberOfLowerIndexShots;
      if (parseInt(hole.index, 10) <= numberOfLowerIndexShots) {
        adjustedPar = parseInt(hole.par, 10) + lowIndexShots;
      } else {
        adjustedPar = parseInt(hole.par, 10) + highIndexShots;
      }

    }
    return adjustedPar;
  }
}
