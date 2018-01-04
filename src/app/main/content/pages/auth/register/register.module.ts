import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { OnlyVisitorGuard, AuthGuard } from '../../../../../core/services/auth-guard.service';
import { RegisterComponent } from './register.component';

const routes = [
    {
        path     : 'register',
        component: RegisterComponent,
        canActivate: [OnlyVisitorGuard, AuthGuard]
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   :[
        AuthService,     
        AuthGuard,
        OnlyVisitorGuard
    ]
})

export class RegisterModule
{

}
