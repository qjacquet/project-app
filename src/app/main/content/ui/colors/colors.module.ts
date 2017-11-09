import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';
import { DemoModule } from '../../../../core/components/demo/demo.module';
import { ColorsComponent } from './colors.component';

const routes: Routes = [
    {
        path     : 'ui/colors',
        component: ColorsComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        DemoModule
    ],
    declarations: [
        ColorsComponent
    ]
})
export class UIColorsModule
{
}
