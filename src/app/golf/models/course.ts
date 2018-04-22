import { Hole } from '../models/hole';

export class Course {
  constructor(
    public course_id: string,
    public holes: Array<Hole>,

  ) {  }
}
