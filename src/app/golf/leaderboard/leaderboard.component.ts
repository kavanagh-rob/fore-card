import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfDataService } from '../shared/services/golf-data.service';
import {Golfer} from '../models/golfer';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private  golfDataService: GolfDataService) {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
  }
  round;
  scorecards = [];
  accordianOpened = -1 ;
  selectedScoreView = 'stableford';

  ngOnInit() {
    this.golfDataService.getScorecardsForRound(this.round.round_id).then(res => { // Success
      this.scorecards = res.Items;
    });
  }

  toggleAccordian (index) {
    this.accordianOpened = this.accordianOpened === index ? -1 : index;
 }

  getLastUpdatedHole(scorecard) {
    return scorecard.baseScores.length === 0 ? 'n/a' : scorecard.baseScores.length;
  }
  getScoreClass(scorecard, index) {
    const strokeScore = parseInt(this.getStrokeScore(scorecard, index), 10);
    const par = parseInt(this.round.course.holes[index].par, 10);
    let resolvedClass = '';
    if (strokeScore) {
      switch (par - strokeScore) {
        case -1:
          resolvedClass = 'bogie';
          break;
        case 0:
          resolvedClass = 'par';
          break;
        case 1:
          resolvedClass = 'birdie';
          break;
        case 2:
          resolvedClass = 'eagle';
          break;
        case 3:
          resolvedClass = 'albatross';
          break;
        default:
          resolvedClass = '';
        }
    }
    return resolvedClass;
  }
  getStrokeScore(scorecard, index) {
    return scorecard.baseScores[index] ? scorecard.baseScores[index] : '';
  }
  getStablefordScore(scorecard, index) {
    return scorecard.stablefordScores[index] !== undefined ? scorecard.stablefordScores[index] : '';
  }
  getTotalScore(scorecard) {
    let score;
    if ( this.selectedScoreView === 'stableford') {
      score = scorecard.totalStablefordScore ? scorecard.totalStablefordScore : 'n/a';
    } else if (this.selectedScoreView === 'stroke') {
      score = this.getTotalStrokes(scorecard);
    }
    return score;
  }

  getTotalStrokes(scorecard) {
    const self = this;
    let strokeScore = 0;
    scorecard.baseScores.forEach(value => {
      if (value) {
        strokeScore = strokeScore +  parseInt(value, 10);
      }
    });
    return strokeScore;
  }

  getStrokeScoreUnderPar(scorecard) {
    const self = this;
    let total = 0;
    this.round.course.holes.forEach(function(hole, index) {
      const shotsForHole  = scorecard.baseScores[index];
      if (shotsForHole) {
        const score = parseInt(shotsForHole, 10) - parseInt(hole.par, 10);
        total = total += score;
      }
    });
    return total;

  }

  getSelectedGolferName(golferId) {
      return this.getSelectedGolfer(golferId).name;
  }
  getSelectedGolfer(golferId) {
      return this.round.golfers.filter(function(obj: Golfer) {
        return obj['golfer_id'] === golferId;
      })[0];
    }
  getWhatsappUrl() {
    return this.sanitize('whatsapp://send?text= ForeCard Leaderboard: - ' + window.location.href + '/');
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  isMobileDevice() {
  // device detection
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
