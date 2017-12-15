import { NgModule } from '@angular/core';

import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
    imports: [
        // Auth
        LoginModule,
        RegisterModule,
        ProfileModule
    ]
})
export class PagesModule
{
}
