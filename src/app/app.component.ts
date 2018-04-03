import { Component } from '@angular/core';
import { GolfDataService } from './golf-data.service';
import {scope} from 'aws-sdk/clients/ec2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private golfDataService: GolfDataService) {}
  title = 'Golf Scores';
  course = '';
  load =  this.golfDataService.getGolfCourse().then( res => { // Success
      this.course = res;
    });
}
