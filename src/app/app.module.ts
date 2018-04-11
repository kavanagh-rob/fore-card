import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GolfDataService } from './golf/shared/services/golf-data.service';
import { LeaderboardComponent } from './golf/leaderboard/leaderboard.component';
import { PageNotFoundComponent } from './golf/page-not-found/page-not-found.component';
import { AddGolferComponent } from './golf/add-golfer/add-golfer.component';
import { GolferFormComponent } from './golf/golfer-form/golfer-form.component';
import {FormControl, FormsModule, NgControl} from '@angular/forms';
import { CourseFormComponent } from './golf/course-form/course-form.component';


const appRoutes: Routes = [
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'addGolfer',
    component: GolferFormComponent
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
    redirectTo: '/leaderboard',
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
    AddGolferComponent,
    GolferFormComponent,
    CourseFormComponent
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
