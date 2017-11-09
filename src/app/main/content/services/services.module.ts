import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { ConfigServiceDocsComponent } from './config/config.component';
import { SplashScreenServiceDocsComponent } from './splash-screen/splash-screen.component';

const routes = [
    {
        path     : 'services/config',
        component: ConfigServiceDocsComponent
    },
    {
        path     : 'services/splash-screen',
        component: SplashScreenServiceDocsComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ConfigServiceDocsComponent,
        SplashScreenServiceDocsComponent
    ]
})
export class ServicesModule
{
}
