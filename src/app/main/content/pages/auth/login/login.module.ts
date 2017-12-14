import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { LoginComponent } from './login.component';

const routes = [
    {
        path     : 'pages/auth/login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        AuthService
    ]
})

export class LoginModule
{

}
