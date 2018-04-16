import { Component, OnInit } from '@angular/core';
import {GolfDataService} from '../../shared/services/golf-data.service';
import {Golfer} from '../../models/golfer';

@Component({
  selector: 'app-golfer-page',
  templateUrl: './golfer-page.component.html',
  styleUrls: ['./golfer-page.component.css']
})
export class GolferPageComponent implements OnInit {
  constructor(private golfDataService: GolfDataService) { }
  selectedGolfers = new Array<Golfer>();
  golfers = '';
  loadData() {
    this.golfDataService.getAllGolfers().then(res => { // Success
      this.golfers = res.Items;
    });
  }
  selectGolfer(golfer: any) {
    this.selectedGolfers.push(golfer);
  }
  isSelectedGolfer( golfer: any) {
    return this.selectedGolfers.find(item => (item.email === golfer.email));
  }


  ngOnInit() {
    this.loadData();
  }


}
