import {Injectable, Output, EventEmitter} from '@angular/core';

@Injectable()
export class LoginService {

    @Output()
    logged: EventEmitter<boolean> = new EventEmitter();

    login(){
        this.logged.emit(true);
    }

    logout(){
        this.logged.emit(false);
    }

}/**
 * Created by agata on 17.02.2018.
 */