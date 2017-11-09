import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { CardsDocsComponent } from './cards/cards.component';
import { CountdownDocsComponent } from './countdown/countdown.component';
import { HljsDocsComponent } from './hljs/hljs.component';
import { MaterialColorPickerDocsComponent } from './material-color-picker/material-color-picker.component';
import { MultiLanguageDocsComponent } from './multi-language/multi-language.component';
import { NavigationDocsComponent } from './navigation/navigation.component';
import { ShortcutsDocsComponent } from './shortcuts/shortcuts.component';
import { SearchBarDocsComponent } from 'app/main/content/components/search-bar/search-bar.component';
import { WidgetDocsComponent } from './widget/widget.component';
import { WidgetModule } from '../../../core/components/widget/widget.module';

const routes = [
    {
        path     : 'components/cards',
        component: CardsDocsComponent
    },
    {
        path     : 'components/countdown',
        component: CountdownDocsComponent
    },
    {
        path     : 'components/highlightjs',
        component: HljsDocsComponent
    },
    {
        path     : 'components/material-color-picker',
        component: MaterialColorPickerDocsComponent
    },
    {
        path     : 'components/multi-language',
        component: MultiLanguageDocsComponent
    },
    {
        path     : 'components/navigation',
        component: NavigationDocsComponent
    },
    {
        path     : 'components/search-bar',
        component: SearchBarDocsComponent
    },
    {
        path     : 'components/shortcuts',
        component: ShortcutsDocsComponent
    },
    {
        path     : 'components/widget',
        component: WidgetDocsComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        WidgetModule
    ],
    declarations: [
        CardsDocsComponent,
        CountdownDocsComponent,
        HljsDocsComponent,
        MaterialColorPickerDocsComponent,
        MultiLanguageDocsComponent,
        NavigationDocsComponent,
        SearchBarDocsComponent,
        ShortcutsDocsComponent,
        WidgetDocsComponent
    ]
})
export class ComponentsModule
{
}
