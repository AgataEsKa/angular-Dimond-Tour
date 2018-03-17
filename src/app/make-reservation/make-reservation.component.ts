import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import { Tour }         from '../tour';
import { TourService }  from '../tour.service';
import {User} from "../user";

@Component({
    selector: 'app-make-reservation',
    templateUrl: 'make-reservation.component.html',
    styleUrls: [ 'make-reservation.component.css' ]
})
export class MakeReservationComponent implements OnInit {
    @Input() tour: Tour;

    user: User = {
        id: 1,
        name: '',
        surname: '',
        address: '',
        emaiAddress: '',
        phoneNumber: ''
    };

    users: User[] = [];

    constructor(
        private route: ActivatedRoute,
        private tourService: TourService,
        private location: Location,
        private router: Router) {}

    ngOnInit(): void {
        this.getTour();
    }


    getTour(): void {
        const id = 1;
        this.tourService.getTour(id)
            .subscribe(tour => {
                this.tour = tour
            });
    }

    goBack(): void {
        this.location.back();
    }

    save(Id, Name, Surname, Address,
         EmailAddress, PhoneNumber): void {
        this.user.id = Id;
        this.user.name = Name;
        this.user.surname = Surname;
        this.user.address = Address;
        this.user.emaiAddress = EmailAddress;
        this.user.phoneNumber = PhoneNumber;


        if(JSON.parse(localStorage.getItem('user'))) {
            this.users = JSON.parse(localStorage.getItem('user'));
        } else {
            console.log('zaciagnalem');
            this.router.navigateByUrl('home');

        }
        this.users.push(this.user);

        localStorage.setItem('user', JSON.stringify(this.users));

        console.log(JSON.parse(localStorage.getItem('user')));
        this.tourService.updateTour(this.tour)
            .subscribe(() => this.goBack());

    }
}
