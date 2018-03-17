import { Component, OnInit } from '@angular/core';
import { Tour } from '../tour';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  tours: Tour[] = [];

  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.getTours();
  }

  getTours(): void {
    this.tourService.getTours()
      .subscribe(tours => this.tours = tours.slice(1, 5));
  }
}
