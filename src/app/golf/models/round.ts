import {Course} from './course';
import {Golfer} from './golfer';


export class Round {
  constructor(
    public round_id: string,
    public course: Course,
    public golfers: Array<Golfer>
  ) {  }
  groups: Array<string>;
}
