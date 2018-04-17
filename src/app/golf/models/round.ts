import {Course} from './course';
import {Player} from 'aws-sdk/clients/gamelift';

export class Round {
  constructor(
    public round_id: string,
    public course: Course,
    public players: Array<Player>
  ) {  }
}
