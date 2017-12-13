import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../../../core/services/config.service';
import { Animations } from '../../../../../core/animations';

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

    constructor(
        private Config: ConfigService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
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
                        console.log(data);
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('currentUser', JSON.stringify(data.currentUser));
                        this.router.navigateByUrl('/');
                    }
                },
                error => {

                });
    }
}
