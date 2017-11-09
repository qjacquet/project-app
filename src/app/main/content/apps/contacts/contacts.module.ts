import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ContactsMainSidenavComponent } from './sidenavs/main/main.component';
import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { ContactsContactListComponent } from './contact-list/contact-list.component';
import { ContactsSelectedBarComponent } from './selected-bar/selected-bar.component';
import { ContactsContactFormDialogComponent } from './contact-form/contact-form.component';

const routes: Routes = [
    {
        path     : '**',
        component: ContactsComponent,
        resolve  : {
            contacts: ContactsService
        }
    }
];

@NgModule({
    imports        : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations   : [
        ContactsComponent,
        ContactsContactListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidenavComponent,
        ContactsContactFormDialogComponent
    ],
    providers      : [
        ContactsService
    ],
    entryComponents: [ContactsContactFormDialogComponent]
})
export class ContactsModule
{
}
