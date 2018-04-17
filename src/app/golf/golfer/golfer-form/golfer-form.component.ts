import { Component, OnInit } from '@angular/core';
import { Golfer } from '../../models/golfer';
import { GolfDataService } from '../../shared/services/golf-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-golfer-form',
  templateUrl: './golfer-form.component.html',
  styleUrls: ['./golfer-form.component.css']
})
export class GolferFormComponent implements OnInit {

  constructor( private golfDataService: GolfDataService,  private router: Router) { }

  model = new Golfer('', '', null);

  submitted = false;

  onSubmit() {
    const data: any = {};
    data.item = this.model;
    this.golfDataService.putPlayer(data).then(res => { // Success
      this.submitted = true;
      this.router.navigate(['/golfers']);
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
