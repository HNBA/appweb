import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { AlertService } from '../alert.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers:[AuthenticationService,AlertService]
})
export class LoginComponent implements OnInit {
    data: any = {};
    returnUrl: string;
    constructor( private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {// get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; }

    onLoggedin() {
      //  localStorage.setItem('isLoggedin', 'true');
       this.authenticationService.login(this.data.username, this.data.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    localStorage.setItem('isLoggedin', 'true');
                },
                error => {
                    this.alertService.error(error);
                    localStorage.setItem('isLoggedin', 'false');
                });
    }

}

=======
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public router: Router) { }

    ngOnInit() { }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

}
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
