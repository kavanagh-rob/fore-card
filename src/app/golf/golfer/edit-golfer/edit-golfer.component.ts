import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import {Golfer} from '../../models/golfer';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-golfer',
  templateUrl: './edit-golfer.component.html',
  styleUrls: ['./edit-golfer.component.css']
})
export class EditGolferComponent implements OnInit {

  @ViewChild('editGolfer') editGolferPage;
  selectedGolfer;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.selectedGolfer =  params;
    });
  }
    ngOnInit() {
       Object.assign(this.editGolferPage.model, this.selectedGolfer);
    }
}
