import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { ResetPassword2Component } from './reset-password-2.component';

const routes = [
    {
        path     : 'pages/auth/reset-password-2',
        component: ResetPassword2Component
    }
];

@NgModule({
    declarations: [
        ResetPassword2Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class ResetPassword2Module
{

}
