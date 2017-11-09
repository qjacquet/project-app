import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';
import { DemoModule } from '../../../../core/components/demo/demo.module';
import { CardedFullWidthComponent } from './carded/fullwidth/fullwidth.component';
import { CardedFullWidth2Component } from './carded/fullwidth-2/fullwidth-2.component';
import { CardedLeftSidenavComponent } from './carded/left-sidenav/left-sidenav.component';
import { CardedLeftSidenavTabbedComponent } from './carded/left-sidenav-tabbed/left-sidenav-tabbed.component';
import { CardedLeftSidenav2Component } from './carded/left-sidenav-2/left-sidenav-2.component';
import { CardedLeftSidenav2TabbedComponent } from './carded/left-sidenav-2-tabbed/left-sidenav-2-tabbed.component';
import { CardedRightSidenavComponent } from './carded/right-sidenav/right-sidenav.component';
import { CardedRightSidenavTabbedComponent } from './carded/right-sidenav-tabbed/right-sidenav-tabbed.component';
import { CardedRightSidenav2Component } from './carded/right-sidenav-2/right-sidenav-2.component';
import { CardedRightSidenav2TabbedComponent } from './carded/right-sidenav-2-tabbed/right-sidenav-2-tabbed.component';
import { SimpleFullWidthComponent } from './simple/fullwidth/fullwidth.component';
import { SimpleLeftSidenavComponent } from './simple/left-sidenav/left-sidenav.component';
import { SimpleLeftSidenav2Component } from './simple/left-sidenav-2/left-sidenav-2.component';
import { SimpleLeftSidenav3Component } from './simple/left-sidenav-3/left-sidenav-3.component';
import { SimpleRightSidenavComponent } from './simple/right-sidenav/right-sidenav.component';
import { SimpleRightSidenav2Component } from './simple/right-sidenav-2/right-sidenav-2.component';
import { SimpleRightSidenav3Component } from './simple/right-sidenav-3/right-sidenav-3.component';
import { TabbedComponent } from './simple/tabbed/tabbed.component';
import { BlankComponent } from './blank/blank.component';

const routes: Routes = [
    {
        path     : 'ui/page-layouts/carded/full-width',
        component: CardedFullWidthComponent
    },
    {
        path     : 'ui/page-layouts/carded/full-width-2',
        component: CardedFullWidth2Component
    },
    {
        path     : 'ui/page-layouts/carded/left-sidenav',
        component: CardedLeftSidenavComponent
    },
    {
        path     : 'ui/page-layouts/carded/left-sidenav-tabbed',
        component: CardedLeftSidenavTabbedComponent
    },
    {
        path     : 'ui/page-layouts/carded/left-sidenav-2',
        component: CardedLeftSidenav2Component
    },
    {
        path     : 'ui/page-layouts/carded/left-sidenav-2-tabbed',
        component: CardedLeftSidenav2TabbedComponent
    },
    {
        path     : 'ui/page-layouts/carded/right-sidenav',
        component: CardedRightSidenavComponent
    },
    {
        path     : 'ui/page-layouts/carded/right-sidenav-tabbed',
        component: CardedRightSidenavTabbedComponent
    },
    {
        path     : 'ui/page-layouts/carded/right-sidenav-2',
        component: CardedRightSidenav2Component
    },
    {
        path     : 'ui/page-layouts/carded/right-sidenav-2-tabbed',
        component: CardedRightSidenav2TabbedComponent
    },
    {
        path     : 'ui/page-layouts/simple/full-width',
        component: SimpleFullWidthComponent
    },
    {
        path     : 'ui/page-layouts/simple/left-sidenav',
        component: SimpleLeftSidenavComponent
    },
    {
        path     : 'ui/page-layouts/simple/left-sidenav-2',
        component: SimpleLeftSidenav2Component
    },
    {
        path     : 'ui/page-layouts/simple/left-sidenav-3',
        component: SimpleLeftSidenav3Component
    },
    {
        path     : 'ui/page-layouts/simple/right-sidenav',
        component: SimpleRightSidenavComponent
    },
    {
        path     : 'ui/page-layouts/simple/right-sidenav-2',
        component: SimpleRightSidenav2Component
    },
    {
        path     : 'ui/page-layouts/simple/right-sidenav-3',
        component: SimpleRightSidenav3Component
    },
    {
        path     : 'ui/page-layouts/simple/tabbed',
        component: TabbedComponent
    },
    {
        path     : 'ui/page-layouts/blank',
        component: BlankComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        DemoModule
    ],
    declarations: [
        CardedFullWidthComponent,
        CardedFullWidth2Component,
        CardedLeftSidenavComponent,
        CardedLeftSidenavTabbedComponent,
        CardedLeftSidenav2Component,
        CardedLeftSidenav2TabbedComponent,
        CardedRightSidenavComponent,
        CardedRightSidenavTabbedComponent,
        CardedRightSidenav2Component,
        CardedRightSidenav2TabbedComponent,
        SimpleFullWidthComponent,
        SimpleLeftSidenavComponent,
        SimpleLeftSidenav2Component,
        SimpleLeftSidenav3Component,
        SimpleRightSidenavComponent,
        SimpleRightSidenav2Component,
        SimpleRightSidenav3Component,
        TabbedComponent,
        BlankComponent
    ]
})
export class UIPageLayoutsModule
{
}
