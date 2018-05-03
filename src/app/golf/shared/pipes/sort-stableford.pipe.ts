import { Pipe, PipeTransform } from '@angular/core';
import { ScoreCard } from '../../models/scoreCards';

@Pipe({ name: 'sortStablefordPipe', pure: false })
export class SortStablefordPipe implements PipeTransform {
  transform(scorecards: ScoreCard[]) {
    console.log(scorecards);
    return scorecards.sort(function(a, b) {
        return (a.totalStablefordScore < b.totalStablefordScore) ? 1 : ((b.totalStablefordScore < a.totalStablefordScore) ? -1 : 0); } );
  }
}
