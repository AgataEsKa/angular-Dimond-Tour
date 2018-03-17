import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { HomeComponent }   from './home/home.component';
import { TourDetailComponent }  from './tour-detail/tour-detail.component';
import { ToursComponent }      from './tours/tours.component';
import { TourSearchComponent }  from './tour-search/tour-search.component';
import { TourService }          from './tour.service';
import { MessageService }       from './message.service';
import { LoginService } from "./login.service";
import { MessagesComponent }    from './messages/messages.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddEditAtourComponent } from './add-edit-atour/add-edit-atour.component';
import { LoginComponent } from './login/login.component';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    HomeComponent,
      ToursComponent,
    TourDetailComponent,
    MessagesComponent,
    TourSearchComponent,
    AboutUsComponent,
    ContactUsComponent,
    AddEditAtourComponent,
    LoginComponent,
    MakeReservationComponent
  ],
  providers: [ TourService, MessageService, LoginService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
