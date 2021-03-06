import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tour }         from '../tour';
import { TourService }  from '../tour.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: [ './tour-detail.component.css' ]
})
export class TourDetailComponent implements OnInit {
  @Input() tour: Tour;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTour();
  }

  getTour(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tourService.getTour(id)
      .subscribe(tour => this.tour = tour);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.tourService.updateTour(this.tour)
      .subscribe(() => this.goBack());
  }
}
