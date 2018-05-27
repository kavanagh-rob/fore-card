import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Golfer} from '../models/golfer';
import { GolfDataService } from '../shared/services/golf-data.service';
import {ScoreCard} from '../models/scoreCards';
import { v1 as uuid } from 'uuid';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  constructor(  private router: Router,  private route: ActivatedRoute, private  golfDataService: GolfDataService) {
    this.route.params.subscribe( params =>
      this.golferId = params['golfer_id']
    );
    this.route.params.subscribe( params =>
      this.groupId = params['group_id']
    );
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
    if ( this.golferId ) {
      this.golfers = [];
      this.golfers.push(this.getGolferById(this.golferId));
    } else if (this.groupId) {
      const self = this;
      this.golfers = this.round.golfers.filter(function(obj: Golfer) {
        return obj['group_id'] === self.groupId;
      });
    }
    this.golfDataService.getScorecards( this.getScorecardIdsRequest() ).then(res => { // Success
      this.scoreCards = res.Responses.ScoreCards;
      this.origionalScoreCards = JSON.parse(JSON.stringify(this.scoreCards));
    });
  }
  scoreOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, ' /'];
  round ;
  golferId;
  groupId;
  golferList = [];
  golfers;
  flashScoreLimit = 0;
  scoreCards = [{totalStablefordScore: 0, baseScores: [], stablefordScores: []},
  {totalStablefordScore: 0, baseScores: [], stablefordScores: []},
  {totalStablefordScore: 0, baseScores: [], stablefordScores: []},
  {totalStablefordScore: 0, baseScores: [], stablefordScores: []}];
  origionalScoreCards;

  ngOnInit() {
  }

  getScorecardIdsRequest() {
    const self = this;
    const scorecardIds = [];
    if ( this.golferId ) {
      scorecardIds.push({scorecard_id: this.round.round_id + '|' + this.golferId});
    } else if ( this.groupId ) {
      this.golfers.forEach(function (golfer) {
        scorecardIds.push({scorecard_id: self.round.round_id + '|' + golfer.golfer_id});
      });
    }
    return {getData : scorecardIds};
  }
  getGolferById(golferId) {
    const self = this;
      return this.round.golfers.filter(function(obj: Golfer) {
        return obj['golfer_id'] === golferId;
      })[0];
  }
  setStableFordScores(golferId) {
    const self = this;
    const scorecard = self.getScorecardByGolferId(golferId);
    this.round.course.holes.forEach(function (hole, index) {
      scorecard.stablefordScores[index] = self.getStableford(hole, index, golferId) ;
    });
    scorecard.totalStablefordScore = this.getTotalPoints(golferId);

  }

  getStableford(hole, number, golferId) {
    let points;
    const golfer = this.getGolferById(golferId);
    if ( golfer ) {
      const adjustedPar = parseInt(this.getAdjustedPar(hole, golfer), 10);
      const scorecard = this.getScorecardByGolferId(golferId);
      if (scorecard.baseScores[number] && scorecard.baseScores[number] > 0 && scorecard.baseScores[number] < adjustedPar + 2) {
        points = adjustedPar + 2 - scorecard.baseScores[number];
      } else if (scorecard.baseScores[number]) {
        points = 0;
      }
      return points;
    }
  }

  getBaseScoreModel(golferId) {
    const model = this.getScorecardByGolferId(golferId);
    return model ? model : {baseScores: []};
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

  getTotalStablefordByGolferId(golfer_id) {
    const scorecard = this.getScorecardByGolferId(golfer_id);
    if (scorecard) {
      return scorecard.totalStablefordScore;
    }
  }

  getTotalPoints(golferId) {
    let totalPoints = 0;
    const scorecard = this.getScorecardByGolferId(golferId);
    if (scorecard) {
      scorecard.stablefordScores.forEach(function (value) {
        if (value) {
          totalPoints = totalPoints +  parseInt(value, 10);
        }
      });
    }
    return totalPoints;
  }

  submitScoreCard() {
    const updateData = {updateScorecards: this.scoreCards};
    this.golfDataService.updateScorecards( updateData ).then(res => { // Success
        this.putFlashUpdates();
        this.router.navigate(['round/' + this.round.round_id + '/leaderboard']);
    });
  }

  putFlashUpdates() {
    const self = this;
    const flashUpdates = this.getFlashUpdates();
      flashUpdates.forEach(function (update) {
        const data: any = {};
        data.table_name = 'FlashUpdates';
        data.item = update;
        self.golfDataService.putFlashUpdates( data );
      });
  }

  getFlashUpdates() {
    const self = this;
    const flashUpdateList = [];
    self.origionalScoreCards.forEach(function (origionalcard) {
      const latestCard = self.getScorecardByGolferId(origionalcard.golfer_id);
      self.round.course.holes.forEach(function(hole, index) {
        if (latestCard.baseScores[index] && !origionalcard.baseScores[index]) {
            const flashScore = self.getFlashScore( latestCard.baseScores[index], self.round.course.holes[index].par);
            if (flashScore) {
              const update = {
                'update_id': origionalcard.golfer_id + '|' + self.round.round_id + '|' + index + 1,
                'round_id': self.round.round_id,
                'golfer': self.getGolferById(origionalcard.golfer_id),
                'type' : 'flashscore',
                'hole': index + 1,
                'flashScore': flashScore,
                'date': Date.now()
              };
              flashUpdateList.push(update);
            }
        }
      });
    });
    return flashUpdateList;
  }

  getFlashScore(score, par) {
    const holeScore = parseInt(score , 10) -  parseInt(par , 10);
    let result = null;
      if (holeScore <= this.flashScoreLimit) {
        switch (holeScore) {
          case 1:
              result = 'bogey';
              break;
          case 0:
              result = 'par';
              break;
          case -1:
              result = 'birdie';
              break;
          case -2:
              result = 'eagle';
              break;
          case -3:
              result = 'albatross';
              break;
          default:
              result = null;
        }
      }
  return result;
  }

}
