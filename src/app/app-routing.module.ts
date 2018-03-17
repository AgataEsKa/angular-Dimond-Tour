import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { ToursComponent }      from './tours/tours.component';
import { TourDetailComponent }  from './tour-detail/tour-detail.component';
import {AboutUsComponent} from "./about-us/about-us.component";
import {MakeReservationComponent} from "./make-reservation/make-reservation.component";
//import {AddEditATour} from "./add-edit-atour/add-edit-atour.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import { LoginComponent } from './login/login.component';
//import {AssignedComponent} from "./assigned/assigned.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'detail/:id', component: TourDetailComponent },
    { path: 'tours', component: ToursComponent }, //Timetable
    { path: 'about-us', component: AboutUsComponent },
    { path: 'make-reservation', component: MakeReservationComponent },
    //{ path: 'add-edit-atour', component: AddEditATour },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'login', component: LoginComponent },
    //{ path: 'assigned', component: AssignedComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
