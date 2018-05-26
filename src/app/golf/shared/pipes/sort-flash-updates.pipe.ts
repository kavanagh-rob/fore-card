import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortFlashUpdatesPipe', pure: false })
export class SortFlashUpdatesPipe implements PipeTransform {
  transform(updates: any[]) {
    return updates.sort(function(a, b) {
        return (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0); } );
  }
}
