import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './forms.component';

const routes: Routes = [
    {
        path     : 'ui/forms',
        component: FormsComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        FormsComponent
    ]
})
export class UIFormsModule
{
}
