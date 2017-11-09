import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';

import { PricingStyle1Component } from './style-1/style-1.component';
import { PricingStyle2Component } from './style-2/style-2.component';
import { PricingStyle3Component } from './style-3/style-3.component';

const routes = [
    {
        path     : 'pages/pricing/style-1',
        component: PricingStyle1Component
    },
    {
        path     : 'pages/pricing/style-2',
        component: PricingStyle2Component
    },
    {
        path     : 'pages/pricing/style-3',
        component: PricingStyle3Component
    }
];

@NgModule({
    declarations: [
        PricingStyle1Component,
        PricingStyle2Component,
        PricingStyle3Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class PricingModule
{

}
