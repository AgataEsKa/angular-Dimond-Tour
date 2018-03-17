import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router'
import {LoginService} from "../login.service";


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: [ 'login.component.css' ]
})
export class LoginComponent {

    //logged = true;

    constructor(
        private location: Location,
        private router: Router,
        private loginService: LoginService
    ) {}


    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.loginService.login();
        console.log("udalo sie zalogowac");
        this.router.navigateByUrl('');
    }

    page = {
        name: 'contact'
    }
}
