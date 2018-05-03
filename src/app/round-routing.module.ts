import {RoundComponent} from './golf/rounds/round.component';
import {LeaderboardComponent} from './golf/leaderboard/leaderboard.component';
import {RoundOverviewComponent} from './golf/rounds/round-overview/round-overview.component';
import {GolferListComponent} from './golf/golfer/golfer-list/golfer-list.component';
import { RouterModule, Routes } from '@angular/router';
import {FormControl, FormsModule, NgControl} from '@angular/forms';
import { NgModule } from '@angular/core';
import { GolferComponent } from './golf/golfer/golfer/golfer.component';
import {CourseResolver} from './golf/shared/resolvers/course-resolver';
import { GroupListComponent } from './golf/group/group-list/group-list.component';
import { GroupFormComponent } from './golf/group/group-form/group-form.component';
import {CommonModule} from '@angular/common';
import { GolferGroupPipe } from './golf/shared/pipes/golfer-group.pipe';

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
      { path: 'leaderboard', component: LeaderboardComponent},
      { path: 'golfers', component: GolferListComponent},
      {path: 'golfer/:golfer_id', component: GolferComponent},
      {path: 'groupList', component: GroupListComponent},
      {path: 'groupForm', component: GroupFormComponent}
    ]
  }
];
@NgModule({
  declarations: [
    GroupListComponent,
    GroupFormComponent,
    GolferGroupPipe
  ],
  imports: [
    RouterModule.forChild(roundRoutes),
    CommonModule,
    FormsModule
  ],
  exports: [ RouterModule ]
})
export class RoundRoutingModule { }
