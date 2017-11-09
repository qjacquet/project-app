import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../../../core/services/config.service';
import { Animations } from '../../../../../core/animations';

@Component({
    selector   : 'reset-password-2',
    templateUrl: './reset-password-2.component.html',
    styleUrls  : ['./reset-password-2.component.scss'],
    animations : Animations
})
export class ResetPassword2Component implements OnInit
{
    resetPasswordForm: FormGroup;
    resetPasswordFormErrors: any;

    constructor(
        private Config: ConfigService,
        private formBuilder: FormBuilder
    )
    {
        this.Config.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.resetPasswordFormErrors = {
            email          : {},
            password       : {},
            passwordConfirm: {}
        };
    }

    ngOnInit()
    {
        this.resetPasswordForm = this.formBuilder.group({
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        });

        this.resetPasswordForm.valueChanges.subscribe(() => {
            this.onResetPasswordFormValuesChanged();
        });
    }

    onResetPasswordFormValuesChanged()
    {
        for ( const field in this.resetPasswordFormErrors )
        {
            if ( this.resetPasswordFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.resetPasswordFormErrors[field] = {};

            // Get the control
            const control = this.resetPasswordForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.resetPasswordFormErrors[field] = control.errors;
            }
        }
    }
}
