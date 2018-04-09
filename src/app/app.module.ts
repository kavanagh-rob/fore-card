import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GolfDataService } from './golf-data.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {
    path: 'leaderboard',
    component: LeaderboardComponent
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
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [GolfDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
