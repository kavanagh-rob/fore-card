import { Component, OnInit } from '@angular/core';
import {GolfDataService} from '../../shared/services/golf-data.service';
import {Golfer} from '../../models/golfer';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-golfer-page',
  templateUrl: './golfer-list.component.html',
  styleUrls: ['./golfer-list.component.css']
})
export class GolferListComponent implements OnInit {
  constructor(private golfDataService: GolfDataService, private router: Router, private route: ActivatedRoute) {
  }
  selectedGolfers = new Array<Golfer>();
  round;
  golfers = '';

  selectGolfer(golfer: Golfer) {
    if ( this.round ) {
      this.router.navigate(['round/' + this.round.round_id + '/golfer/' + golfer.golfer_id]);
    } else if (this.isAddRound()) {
      this.toggleToSelectedGolfers(golfer);
    }
  }
  toggleToSelectedGolfers(golfer) {
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

  isAddRound() {
    return this.router.url.includes('addRound');
  }

  loadAllGolfers() {
    this.golfDataService.getAllGolfers().then(res => { // Success
      this.golfers = res.Items;
    });
  }

  ngOnInit() {
    if (this.route.snapshot.data['resolvedRound']) {
      this.round = this.route.snapshot.data['resolvedRound'].Item;
      this.golfers = this.round.golfers;
    } else {
      this.loadAllGolfers();
    }
  }
}
