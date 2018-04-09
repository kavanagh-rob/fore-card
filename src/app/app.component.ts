import { Component } from '@angular/core';
import { GolfDataService } from './golf-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private golfDataService: GolfDataService) {
    this.loadData();
  }
  title = 'Golf Scores';
  course = '';
  loadData() {
    this.golfDataService.getGolfCourse().then(res => { // Success
      this.course = res;
    });
  }
}
