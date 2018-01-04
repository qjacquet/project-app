import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { OnlyVisitorGuard, AuthGuard } from '../../../../../core/services/auth-guard.service';
import { LoginComponent } from './login.component';

const routes = [
    {
        path     : 'login',
        component: LoginComponent,
        canActivate: [OnlyVisitorGuard, AuthGuard]
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
        AuthService,
        AuthGuard,
        OnlyVisitorGuard
    ]
})

export class LoginModule
{

}
