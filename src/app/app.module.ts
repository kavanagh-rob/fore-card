import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import {FormControl, FormsModule, NgControl} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GolfDataService } from './golf/shared/services/golf-data.service';
import { LeaderboardComponent } from './golf/leaderboard/leaderboard.component';
import { PageNotFoundComponent } from './golf/page-not-found/page-not-found.component';
import { GolferComponent } from './golf/golfer/golfer/golfer.component';
import { GolferFormComponent } from './golf/golfer/golfer-form/golfer-form.component';
import { CourseFormComponent } from './golf/course/course-form/course-form.component';
import { CourseListComponent } from './golf/course/course-list/course-list.component';
import { RoundComponent } from './golf/rounds/round.component';
import { RoundUpdateComponent } from './golf/rounds/round-update/round-update.component';
import { RoundListComponent } from './golf/rounds/round-list/round-list.component';
import { RoundFormComponent } from './golf/rounds/round-form/round-form.component';
import { GolferListComponent } from './golf/golfer/golfer-list/golfer-list.component';
import { EditGolferComponent } from './golf/golfer/edit-golfer/edit-golfer.component';
import { ScoreCardComponent } from './golf/score-card/score-card.component';
import {CourseResolver} from './golf/shared/resolvers/course-resolver';
import {GolferResolver} from './golf/shared/resolvers/golfer-resolver';
import {RoundRoutingModule} from './round-routing.module';
import { SortStablefordPipe } from './golf/shared/pipes/sort-stableford.pipe';
import { SortFlashUpdatesPipe } from './golf/shared/pipes/sort-flash-updates.pipe';
import { FindNewCourseComponent } from './golf/course/find-new-course/find-new-course.component';
import { WebScraperService } from './golf/shared/services/web-scraper.service';

const appRoutes: Routes = [
  {
    path: 'rounds',
    component: RoundListComponent
  },
  {
    path: 'addRound',
    component: RoundFormComponent
  },
  {
    path: 'addGolfer',
    component: GolferFormComponent
  },
  {
    path: 'editGolfer',
    component: EditGolferComponent
  },
  {
    path: 'golfers',
    component: GolferListComponent
  },
   {
    path: 'courses',
    component: CourseListComponent
  },
  {
    path: 'searchCourse',
    component: FindNewCourseComponent
  },
  {
    path: 'manualAddCourse',
    component: CourseFormComponent
  },
  { path: '',
    redirectTo: '/rounds',
    pathMatch: 'full'
  },
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/pageNotFound'},
];


@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    PageNotFoundComponent,
    GolferFormComponent,
    CourseFormComponent,
    RoundUpdateComponent,
    CourseListComponent,
    RoundListComponent,
    RoundFormComponent,
    GolferListComponent,
    EditGolferComponent,
    ScoreCardComponent,
    GolferComponent,
    RoundComponent,
    SortStablefordPipe,
    SortFlashUpdatesPipe,
    FindNewCourseComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }, // <-- debugging purposes only
    ),
    RoundRoutingModule,
    RouterModule.forChild( appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [GolfDataService, CourseResolver, GolferResolver, WebScraperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
