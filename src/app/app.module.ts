import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from './core/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { PagesModule } from './main/content/pages/pages.module';
import { AppComponent } from './app.component';
import { ProjectModule } from './main/content/apps/dashboards/project/project.module';
import { FakeDbService } from './fake-db/fake-db.service';
import { MainModule } from './main/main.module';
import { SplashScreenService } from './core/services/splash-screen.service';
import { ConfigService } from './core/services/config.service';
import { NavigationService } from './core/components/navigation/navigation.service';
import { MarkdownModule } from 'angular2-markdown';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { AuthGuard, OnlyLoggedInUsersGuard } from './core/services/auth-guard.service';
import { AuthService } from './core/services/auth.service';
import { JwtHelper } from 'angular2-jwt';

const appRoutes: Routes = [
    {
        path        : 'apps/scrumboard',
        loadChildren: './main/content/apps/scrumboard/scrumboard.module#ScrumboardModule',
        canActivate: [OnlyLoggedInUsersGuard, AuthGuard]
    },
    {
        path        : 'apps/chat',
        loadChildren: './main/content/apps/chat/chat.module#ChatModule',
        canActivate: [OnlyLoggedInUsersGuard, AuthGuard]
    },
    {
        path        : 'apps/file-manager',
        loadChildren: './main/content/apps/file-manager/file-manager.module#FileManagerModule',
        canActivate: [OnlyLoggedInUsersGuard, AuthGuard]
    },
    {
        path        : 'apps/dashboards/project',
        loadChildren: './main/content/apps/dashboards/project/project.module#ProjectModule',
        canActivate: [OnlyLoggedInUsersGuard, AuthGuard]
    },
    {
        path      : '**',
        redirectTo: 'apps/dashboards/project',
        canActivate: [OnlyLoggedInUsersGuard, AuthGuard]
    }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "/assets/i18n/", ".json");
}

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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        MainModule,

        PagesModule,

        ProjectModule
    ],
    providers   : [
        /** HTTP Custom */
        {
            provide: HttpService,
            useFactory: (backend: XHRBackend, options: RequestOptions, authService: AuthService) => {
              return new HttpService(backend, options, authService);
            },
            deps: [XHRBackend, RequestOptions, AuthService]
        },
        SplashScreenService,
        ConfigService,
        NavigationService,
        AuthGuard,
        OnlyLoggedInUsersGuard,
        JwtHelper
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
