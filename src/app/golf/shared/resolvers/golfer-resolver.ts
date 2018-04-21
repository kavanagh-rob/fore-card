import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GolfDataService } from '../services/golf-data.service';


@Injectable()
export class GolferResolver implements Resolve<any> {

  constructor(private golfDataService: GolfDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.golfDataService.getGolfersForRound(route.params['round_id']);
  }
}
