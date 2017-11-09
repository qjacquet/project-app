import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Animations } from '../../../../core/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactsContactFormDialogComponent } from './contact-form/contact-form.component';
import { MatDialog } from '@angular/material';

@Component({
    selector     : 'contacts',
    templateUrl  : './contacts.component.html',
    styleUrls    : ['./contacts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class ContactsComponent implements OnInit
{
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    dialogRef: any;

    constructor(
        private contactsService: ContactsService,
        public dialog: MatDialog
    )
    {
        this.searchInput = new FormControl('');
    }

    newContact()
    {
        this.dialogRef = this.dialog.open(ContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this.contactsService.updateContact(response.getRawValue());

            });

    }

    ngOnInit()
    {

        this.contactsService.onSelectedContactsChanged
            .subscribe(selectedContacts => {
                this.hasSelectedContacts = selectedContacts.length > 0;
            });

        this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchText => {
                this.contactsService.onSearchTextChanged.next(searchText);
            });
    }

}
