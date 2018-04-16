import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GolfDataService } from './golf/shared/services/golf-data.service';
import { LeaderboardComponent } from './golf/leaderboard/leaderboard.component';
import { PageNotFoundComponent } from './golf/page-not-found/page-not-found.component';
import { GolferFormComponent } from './golf/golfer/golfer-form/golfer-form.component';
import {FormControl, FormsModule, NgControl} from '@angular/forms';
import { CourseFormComponent } from './golf/course/course-form/course-form.component';
import { HomepageComponent } from './golf/homepage/homepage.component';
import { CoursePageComponent } from './golf/course/course-page/course-page.component';
import { RoundPageComponent } from './golf/rounds/round-page/round-page.component';
import { RoundFormComponent } from './golf/rounds/round-form/round-form.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'rounds',
    component: RoundPageComponent
  },
  {
    path: 'addRound',
    component: RoundFormComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'addGolfer',
    component: GolferFormComponent
  },
  {
    path: 'course',
    component: CoursePageComponent
  },
  {
    path: 'addCourse',
    component: CourseFormComponent
  },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    redirectTo: '/home',
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
    HomepageComponent,
    CoursePageComponent,
    RoundPageComponent,
    RoundFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [GolfDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
