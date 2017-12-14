import { NgModule } from '@angular/core';

import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';

@NgModule({
    imports: [
        // Auth
        LoginModule,
        RegisterModule
    ]
})
export class PagesModule
{
}
