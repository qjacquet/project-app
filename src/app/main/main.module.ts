import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { MainComponent } from './main.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavigationModule } from '../core/components/navigation/navigation.module';
import { NavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { NavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { QuickPanelComponent } from './quick-panel/quick-panel.component';
import { ThemeOptionsComponent } from '../core/components/theme-options/theme-options.component';
import { ShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { SearchBarModule } from '../core/components/search-bar/search-bar.module';

@NgModule({
    declarations: [
        ContentComponent,
        FooterComponent,
        MainComponent,
        NavbarVerticalComponent,
        NavbarHorizontalComponent,
        ToolbarComponent,
        NavbarVerticalToggleDirective,
        ThemeOptionsComponent,
        QuickPanelComponent
    ],
    imports     : [
        SharedModule,
        RouterModule,
        NavigationModule,
        ShortcutsModule,
        SearchBarModule
    ],
    exports     : [
        MainComponent
    ]
})

export class MainModule
{
}
