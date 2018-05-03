import { Pipe, PipeTransform } from '@angular/core';
import { Golfer } from '../../models/golfer';

@Pipe({ name: 'golferGroupPipe' ,  pure: false})
export class GolferGroupPipe implements PipeTransform {
  transform(golfers: Golfer[], group_id: string) {
    return golfers.filter(
      golfer => golfer.group_id === group_id);
    }

}
