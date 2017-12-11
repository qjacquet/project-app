import { NgModule } from '@angular/core';

import { LoginModule } from './auth/login/login.module';

@NgModule({
    imports: [
        // Auth
        LoginModule
    ]
})
export class PagesModule
{
}
