import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { RegisterComponent } from './register.component';

const routes = [
    {
        path     : 'register',
        component: RegisterComponent
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
        UserService
    ]
})

export class RegisterModule
{

}
