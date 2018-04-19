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
import { GolferPageComponent } from './golf/golfer/golfer-page/golfer-page.component';
import { EditGolferComponent } from './golf/golfer/edit-golfer/edit-golfer.component';
import {CourseResolver} from './golf/shared/resolvers/course-resolver';


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
    path: 'round/:round_id',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomepageComponent },
      { path: 'leaderboard', component: LeaderboardComponent,
        resolve: {
          resolvedRound: CourseResolver
        }},
      { path: 'golfers', component: GolferPageComponent }
    ]
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
    path: 'editGolfer',
    component: EditGolferComponent
  },
  {
    path: 'golfers',
    component: GolferPageComponent
  },
  {
    path: 'courses',
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
    RoundFormComponent,
    GolferPageComponent,
    EditGolferComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }, // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [GolfDataService, CourseResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
