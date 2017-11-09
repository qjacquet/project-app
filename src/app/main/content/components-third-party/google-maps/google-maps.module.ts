import { NgModule } from '@angular/core';
import { GoogleMapsDocsComponent } from './google-maps.component';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

const routes = [
    {
        path     : 'components-third-party/google-maps',
        component: GoogleMapsDocsComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        })
    ],
    declarations: [
        GoogleMapsDocsComponent
    ]
})
export class GoogleMapsModule
{
}
