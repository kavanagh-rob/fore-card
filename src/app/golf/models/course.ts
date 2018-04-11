import { Hole } from '../models/hole';

export class Course {
  constructor(
    public name: string,
    public holes: Array<Hole>,

  ) {  }
}
