import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { ProjectModule } from './main/content/apps/dashboards/project/project.module';
import { FakeDbService } from './fake-db/fake-db.service';
import { MainModule } from './main/main.module';
import { PagesModule } from './main/content/pages/pages.module';
import { UIModule } from './main/content/ui/ui.module';
import { ComponentsModule } from './main/content/components/components.module';
import { SplashScreenService } from './core/services/splash-screen.service';
import { ConfigService } from './core/services/config.service';
import { NavigationService } from './core/components/navigation/navigation.service';
import { ComponentsThirdPartyModule } from './main/content/components-third-party/components-third-party.module';
import { ServicesModule } from './main/content/services/services.module';
import { AngularMaterialModule } from './main/content/components/angular-material/angular-material.module';
import { MarkdownModule } from 'angular2-markdown';
import { TranslateModule } from '@ngx-translate/core';

const appRoutes: Routes = [
    {
        path        : 'apps/mail',
        loadChildren: './main/content/apps/mail/mail.module#MailModule'
    },
    {
        path        : 'apps/chat',
        loadChildren: './main/content/apps/chat/chat.module#ChatModule'
    },
    {
        path        : 'apps/calendar',
        loadChildren: './main/content/apps/calendar/calendar.module#CustomCalendarModule'
    },
    {
        path        : 'apps/e-commerce',
        loadChildren: './main/content/apps/e-commerce/e-commerce.module#EcommerceModule'
    },
    {
        path        : 'apps/todo',
        loadChildren: './main/content/apps/todo/todo.module#TodoModule'
    },
    {
        path        : 'apps/file-manager',
        loadChildren: './main/content/apps/file-manager/file-manager.module#FileManagerModule'
    },
    {
        path        : 'apps/contacts',
        loadChildren: './main/content/apps/contacts/contacts.module#ContactsModule'
    },
    {
        path        : 'apps/scrumboard',
        loadChildren: './main/content/apps/scrumboard/scrumboard.module#ScrumboardModule'
    },
    {
        path      : '**',
        redirectTo: 'apps/dashboards/project'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        MarkdownModule.forRoot(),
        TranslateModule.forRoot(),

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        MainModule,

        ProjectModule,

        PagesModule,
        UIModule,
        ServicesModule,
        ComponentsModule,
        AngularMaterialModule,
        ComponentsThirdPartyModule
    ],
    providers   : [
        SplashScreenService,
        ConfigService,
        NavigationService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
