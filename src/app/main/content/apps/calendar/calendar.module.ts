import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { CalendarModule } from 'angular-calendar';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';

const routes: Routes = [
    {
        path     : '**',
        component: CalendarComponent,
        children : [],
        resolve  : {
            chat: CalendarService
        }
    }
];

@NgModule({
    imports        : [
        SharedModule,
        RouterModule.forChild(routes),
        CalendarModule.forRoot()
    ],
    declarations   : [
        CalendarComponent,
        CalendarEventFormDialogComponent
    ],
    providers      : [
        CalendarService
    ],
    entryComponents: [CalendarEventFormDialogComponent]
})
export class CustomCalendarModule
{
}
