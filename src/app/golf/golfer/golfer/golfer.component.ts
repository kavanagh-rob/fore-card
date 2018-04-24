import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-golfer',
  templateUrl: './golfer.component.html',
  styleUrls: ['./golfer.component.css']
})
export class GolferComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}
  round ;

  ngOnInit() {
    this.round = this.route.snapshot.parent.data['resolvedRound'].Item;
  }
}
