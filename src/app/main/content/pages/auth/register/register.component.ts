import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../../../core/services/config.service';
import { Animations } from '../../../../../core/animations';

import { AuthService } from '../../../../../core/services/auth.service';
import { User, UserStatus } from '../../../../../core/models/user';
import { AutofocusDirective } from '../../../../../core/directives/autofocus.directive'

@Component({
    selector   : 'register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss'],
    animations : Animations
})
export class RegisterComponent implements OnInit
{
    registerForm: FormGroup;
    registerFormErrors: any;
    user: User;

    constructor(
        private Config: ConfigService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    )
    {
        this.Config.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.registerFormErrors = {
            firstName      : {},
            lastName       : {},
            login          : {},
            password       : {},
            passwordConfirm: {}
        };

        this.user = new User();
    }

    ngOnInit()
    {
        this.registerForm = this.formBuilder.group({
            firstName      : ['', Validators.required],
            lastName       : ['', Validators.required],
            login          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged()
    {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }

    setUser()
    {
        this.user = this.registerForm.value;
        this.user.avatar = "/assets/images/avatars/profile.jpg";
        this.user.admin = false;
        this.user.status = UserStatus.OFFLINE;
    }

    signup() 
    {   
        this.setUser();
        this.authService.register(this.user)
            .subscribe(response => {
                this.router.navigateByUrl('login');
            });
    }
}
