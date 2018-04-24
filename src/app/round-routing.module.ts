import {RoundComponent} from './golf/rounds/round.component';
import {RoundLeaderboardComponent} from './golf/rounds/round-leaderboard/round-leaderboard.component';
import {RoundOverviewComponent} from './golf/rounds/round-overview/round-overview.component';
import {GolferListComponent} from './golf/golfer/golfer-list/golfer-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GolferComponent } from './golf/golfer/golfer/golfer.component';
import { GroupComponent } from './golf/group/group.component';
import {CourseResolver} from './golf/shared/resolvers/course-resolver';

export const roundRoutes: Routes = [
  {
    path: 'round/:round_id',
    component: RoundComponent,
    resolve: {
      resolvedRound: CourseResolver
    },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: RoundOverviewComponent },
      { path: 'leaderboard', component: RoundLeaderboardComponent},
      { path: 'golfers', component: GolferListComponent},
      {path: 'golfer/:golfer_id', component: GolferComponent},
      {path: 'groups', component: GroupComponent}
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(roundRoutes)
  ],
  exports: [ RouterModule ]
})
export class RoundRoutingModule { }
