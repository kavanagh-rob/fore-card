import { Component, OnInit } from '@angular/core';
import { Golfer } from '../../models/golfer';
import { GolfDataService } from '../../shared/services/golf-data.service';

@Component({
  selector: 'app-golfer-form',
  templateUrl: './golfer-form.component.html',
  styleUrls: ['./golfer-form.component.css']
})
export class GolferFormComponent implements OnInit {

  constructor( private golfDataService: GolfDataService) { }

  model = new Golfer('', '', null);

  submitted = false;

  onSubmit() {
    const data: any = {};
    data.item = this.model;
    console.log(data);
    this.golfDataService.putPlayer(data).then(res => { // Success
      console.log('golfer put success');
    });
    this.submitted = true;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
