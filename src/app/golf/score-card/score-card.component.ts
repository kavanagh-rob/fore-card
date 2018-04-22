import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Golfer} from '../models/golfer';
import { GolfDataService } from '../shared/services/golf-data.service';
import {ScoreCard} from '../models/scoreCards';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  constructor( private route: ActivatedRoute, private  golfDataService: GolfDataService) {
    this.route.params.subscribe( params =>
      this.golferId = params['golfer_id']
    );
    this.round = this.route.snapshot.data['resolvedRound'].Item;
    this.golfDataService.getScorecards( this.getScorecardIdsRequest() ).then(res => { // Success
      this.scoreCards = res.Responses.ScoreCards;
    });
    this.golfers = this.getSelectedGolfers();
  }
  scoreOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, ' /'];
  round ;
  golferId;
  golfers;
  scoreCards = [{baseScores: [], stablefordScores: []}]
  scorecardIds;

  ngOnInit() {
  }

  getScorecardIdsRequest() {
    this.scorecardIds = [];
    if ( this.golferId ) {
      this.scorecardIds.push({scorecard_id: this.round.round_id + '|' + this.golferId});
    }
    return this.scorecardIds;
  }
  getSelectedGolfers() {
    const self = this;
    if (self.golferId) {
      return this.round.golfers.filter(function(obj: Golfer) {
        return obj['golfer_id'] === self.golferId;
      });
    }
  }
  setStableFordScores(golferIndex) {
    const self = this;
    const golfer = this.golfers[ golferIndex ];
    this.round.course.holes.forEach(function (hole, index) {
      const scorecard = self.getScorecardByGolferId(golfer.golfer_id);
      scorecard.stablefordScores[index] = self.getStableford(hole, index, golfer) ;
    });
  }

  getStableford(hole, number, golfer) {
    let points;
    if ( golfer ) {
      const adjustedPar = this.getAdjustedPar(hole, golfer);
      const scorecard = this.getScorecardByGolferId(golfer.golfer_id);
      if (scorecard.baseScores[number] && scorecard.baseScores[number] > 0 && scorecard.baseScores[number] < adjustedPar + 2) {
        points = adjustedPar + 2 - scorecard.baseScores[number];
      } else if (scorecard.baseScores[number]) {
        points = 0;
      }
      return points;
    }
  }
  getScorecardByGolferId(golferId) {
    return this.scoreCards.filter(function(obj: ScoreCard) {
      return obj['golfer_id'] === golferId;
    })[0];
  }

  getAdjustedPar(hole, golfer) {
    const highIndexShots = Math.trunc(golfer.handicap / 18);
    const lowIndexShots = highIndexShots + 1;

    let numberOfLowerIndexShots = golfer.handicap % 18;
    let adjustedPar = hole.par;
    if ( golfer.handicap > 0 ) {
      numberOfLowerIndexShots = numberOfLowerIndexShots === 0 ? 18 : numberOfLowerIndexShots;
      if (parseInt(hole.index, 10) <= numberOfLowerIndexShots) {
        adjustedPar = parseInt(hole.par, 10) + lowIndexShots;
      } else {
        adjustedPar = parseInt(hole.par, 10) + highIndexShots;
      }
    }
    return adjustedPar;
  }

  getTotalPoints(golferIndex) {
    let totalPoints = 0;
    const golferId = this.golfers[golferIndex].golfer_id;
    const scorecard = this.getScorecardByGolferId(golferId);
    scorecard.stablefordScores.forEach(function (value) {
      if (value) {
        totalPoints = totalPoints +  parseInt(value, 10);
      }
    });
    return totalPoints;
  }
}
