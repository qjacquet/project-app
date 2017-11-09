import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { CustomNgxDatatableComponent } from './datatable/ngx-datatable.component';
import { GoogleMapsModule } from './google-maps/google-maps.module';

const routes = [
    {
        path     : 'components-third-party/datatables/ngx-datatable',
        component: CustomNgxDatatableComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        GoogleMapsModule
    ],
    declarations: [
        CustomNgxDatatableComponent
    ]
})
export class ComponentsThirdPartyModule
{
}
