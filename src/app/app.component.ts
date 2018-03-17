import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private loginService: LoginService, private router: Router) {}

  title = 'Tour of Tours';

    logout(): void {
        this.router.navigateByUrl('home');
        this.loginService.logout();
    }

    logged = false;

    ngOnInit() {
        // this.tourService.saveTours(this.getTours.createDb());
        this.loginService.logged.subscribe((data) => {
            this.logged = data;
        });
    }


}
