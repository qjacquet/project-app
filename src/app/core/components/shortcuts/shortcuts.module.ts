import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShortcutsComponent } from './shortcuts.component';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
    declarations: [
        ShortcutsComponent
    ],
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        ShortcutsComponent
    ]
})
export class ShortcutsModule
{
}
