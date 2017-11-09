import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';
import { WidgetModule } from '../../../../core/components/widget/widget.module';
import { AngularMaterialComponent } from 'app/main/content/components/angular-material/angular-material.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer';
import { EXAMPLE_LIST } from './example-components';

const routes: Routes = [
    {
        path    : 'components/angular-material',
        children: [
            {
                path     : ':id',
                component: AngularMaterialComponent
            }
        ]
    }
];

@NgModule({
    imports        : [
        SharedModule,
        RouterModule.forChild(routes),
        WidgetModule
    ],
    exports        : [
        SharedModule
    ],
    entryComponents: EXAMPLE_LIST,
    declarations   : [
        [...EXAMPLE_LIST],
        AngularMaterialComponent,
        ExampleViewerComponent
    ]
})
export class AngularMaterialModule
{
}

