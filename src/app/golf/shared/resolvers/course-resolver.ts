import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GolfDataService } from '../services/golf-data.service';

@Injectable()
export class CourseResolver implements Resolve<any> {

  constructor(private golfDataService: GolfDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.golfDataService.getGolfRound(route.params['round_id']);
  }
}
