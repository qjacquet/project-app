import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { DemoContentComponent } from './demo-content/demo-content.component';
import { DemoSidenavComponent } from './demo-sidenav/demo-sidenav.component';

@NgModule({
    declarations: [
        DemoContentComponent,
        DemoSidenavComponent
    ],
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        DemoContentComponent,
        DemoSidenavComponent
    ]
})
export class DemoModule
{
}
