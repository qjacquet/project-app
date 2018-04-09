import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../../../core/services/config.service';
import { Animations } from '../../../../../core/animations';
import { JwtHelper } from 'angular2-jwt';

@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : Animations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    redirectUrl: string;

    constructor(
        private Config: ConfigService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private jwtHelper: JwtHelper
    )
    {
        this.Config.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            login   : {},
            password: {},
            global  : {}
        };

        this.redirectUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            login   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    signin() 
    {
        this.authService.signin(this.loginForm.value)
            .subscribe(
                data => {
                    if (data.success == false) {
                        this.loginFormErrors.global = data.message;
                    }
                    if (data.success == true) {
                        localStorage.setItem('access_token', data.token);
                        this.router.navigateByUrl(this.redirectUrl);
                    }
                },
                error => {

                });
    }
}
