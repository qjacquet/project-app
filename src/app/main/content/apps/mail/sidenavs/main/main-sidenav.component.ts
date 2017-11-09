import { Component, OnDestroy, OnInit } from '@angular/core';
import { MailService } from '../../mail.service';
import { Subscription } from 'rxjs/Subscription';
import { MailComposeDialogComponent } from '../../dialogs/compose/compose.component';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Animations } from '../../../../../../core/animations';

@Component({
    selector   : 'mail-main-sidenav',
    templateUrl: './main-sidenav.component.html',
    styleUrls  : ['./main-sidenav.component.scss'],
    animations : Animations
})
export class MailMainSidenavComponent implements OnInit, OnDestroy
{
    folders: any[];
    filters: any[];
    labels: any[];
    accounts: object;
    selectedAccount: string;
    dialogRef: any;

    onFoldersChanged: Subscription;
    onFiltersChanged: Subscription;
    onLabelsChanged: Subscription;

    constructor(
        private mailService: MailService,
        public dialog: MatDialog
    )
    {
        // Data
        this.accounts = {
            'qjacquet'    : 'johndoe@fake.com'
        };

        this.selectedAccount = 'qjacquet';
    }

    ngOnInit()
    {
        this.onFoldersChanged =
            this.mailService.onFoldersChanged
                .subscribe(folders => {
                    this.folders = folders;
                });

        this.onFiltersChanged =
            this.mailService.onFiltersChanged
                .subscribe(filters => {
                    this.filters = filters;
                });

        this.onLabelsChanged =
            this.mailService.onLabelsChanged
                .subscribe(labels => {
                    this.labels = labels;
                });
    }

    composeDialog()
    {
        this.dialogRef = this.dialog.open(MailComposeDialogComponent, {
            panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Send
                     */
                    case 'send':
                        console.log('new Mail', formData.getRawValue());
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete Mail');
                        break;
                }
            });
    }

    ngOnDestroy()
    {
        this.onFoldersChanged.unsubscribe();
        this.onFiltersChanged.unsubscribe();
        this.onLabelsChanged.unsubscribe();
    }
}
