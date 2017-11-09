import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatSidenavHelperDirective, MatSidenavTogglerDirective } from '../directives/mat-sidenav-helper/mat-sidenav-helper.directive';
import { MatSidenavHelperService } from '../directives/mat-sidenav-helper/mat-sidenav-helper.service';
import { PipesModule } from '../pipes/pipes.module';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { CountdownComponent } from '../components/countdown/countdown.component';
import { MatchMedia } from '../services/match-media.service';
import { NavbarVerticalService } from '../../main/navbar/vertical/navbar-vertical.service';
import { HljsComponent } from '../components/hljs/hljs.component';
import { PerfectScrollbarDirective } from '../directives/perfect-scrollbar/perfect-scrollbar.directive';
import { IfOnDomDirective } from '../directives/if-on-dom/if-on-dom.directive';
import { MaterialColorPickerComponent } from '../components/material-color-picker/material-color-picker.component';
import { TranslationLoaderService } from '../services/translation-loader.service';
import { CookieService } from 'ngx-cookie-service';
import { MarkdownModule } from 'angular2-markdown';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations   : [
        MatSidenavHelperDirective,
        MatSidenavTogglerDirective,
        ConfirmDialogComponent,
        CountdownComponent,
        HljsComponent,
        IfOnDomDirective,
        PerfectScrollbarDirective,
        MaterialColorPickerComponent
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        MarkdownModule
    ],
    exports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        MatSidenavHelperDirective,
        MatSidenavTogglerDirective,
        PipesModule,
        CountdownComponent,
        HljsComponent,
        PerfectScrollbarDirective,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        IfOnDomDirective,
        MaterialColorPickerComponent,
        MarkdownModule,
        TranslateModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    providers      : [
        CookieService,
        MatchMedia,
        NavbarVerticalService,
        MatSidenavHelperService,
        TranslationLoaderService
    ]
})

export class SharedModule
{

}
