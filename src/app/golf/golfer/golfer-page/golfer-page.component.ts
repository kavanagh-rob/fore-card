import { Component, OnInit } from '@angular/core';
import {GolfDataService} from '../../shared/services/golf-data.service';
import {Golfer} from '../../models/golfer';
import {Router, NavigationExtras, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-golfer-page',
  templateUrl: './golfer-page.component.html',
  styleUrls: ['./golfer-page.component.css']
})
export class GolferPageComponent implements OnInit {
  constructor(private golfDataService: GolfDataService, private router: Router) {
  }
  selectedGolfers = new Array<Golfer>();
  golfers = '';
  loadData() {
    this.golfDataService.getAllGolfers().then(res => { // Success
      this.golfers = res.Items;
    });
  }
  selectGolfer(golfer: Golfer) {
    if (this.isSelectedGolfer((golfer))) {
        this.removeFromGolfers(golfer);
    } else {
      this.selectedGolfers.push(golfer);
    }
  }
  isSelectedGolfer( golfer: Golfer) {
    return this.selectedGolfers.find(item => (item.email === golfer.email));
  }

  removeFromGolfers( golfer: Golfer) {
    this.selectedGolfers = this.selectedGolfers.filter(function( obj ) {
      return obj.email !== golfer.email;
    });
  }

  editGolfer( golfer: Golfer ) {
    const navigationExtras: NavigationExtras = {
      queryParams: golfer
    };
    this.router.navigate(['editGolfer'], navigationExtras);
  }
  ngOnInit() {
    this.loadData();
  }


}
