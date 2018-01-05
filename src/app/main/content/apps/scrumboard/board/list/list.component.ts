import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Utils } from '../../../../../../core/utils';
import { ScrumboardService } from '../../scrumboard.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ScrumboardCardDialogComponent } from '../dialogs/card/card.component';
import { ConfirmDialogComponent } from '../../../../../../core/components/confirm-dialog/confirm-dialog.component';
import { Card } from '../../card.model';
import { PerfectScrollbarDirective } from '../../../../../../core/directives/perfect-scrollbar/perfect-scrollbar.directive';
import { AuthService } from '../../../../../../core/services/auth.service';


@Component({
    selector     : 'scrumboard-board-list',
    templateUrl  : './list.component.html',
    styleUrls    : ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScrumboardBoardListComponent implements OnInit, OnDestroy
{
    board: any;
    dialogRef: any;

    @Input() list;
    @ViewChild(PerfectScrollbarDirective) listScroll: PerfectScrollbarDirective;

    onBoardChanged: Subscription;

    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

    constructor(
        private route: ActivatedRoute,
        private scrumboardService: ScrumboardService,
        private authService: AuthService,
        public dialog: MatDialog
    )
    {
    }

    ngOnInit()
    {
        this.onBoardChanged =
            this.scrumboardService.onBoardChanged
                .subscribe(board => {
                    this.board = board;
                });

    }

    onListNameChanged(newListName)
    {
        this.list.name = newListName;
    }

    onCardAdd(newCardName)
    {
        if ( newCardName === '' )
        {
            return;
        }

        this.scrumboardService
            .addCard(this.list.id, 
                new Card({
                    name: newCardName,
                    idMembers: this.authService.getCurrentUserAsMember()._id
                })
        );

        setTimeout(() => {
            this.listScroll.scrollToBottom(0, 400);
        });
    }

    removeList(listId)
    {
        this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the list and it\'s all cards?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this.scrumboardService.removeList(listId);
            }
        });
    }

    openCardDialog(cardId)
    {
        this.scrumboardService.getUsers();
        this.dialogRef = this.dialog.open(ScrumboardCardDialogComponent, {
            panelClass: 'scrumboard-card-dialog',
            data      : {
                cardId: cardId,
                listId: this.list.id
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                this.scrumboardService.updateBoard();
            });
    }

    onDrop(ev)
    {
        this.scrumboardService.updateBoard();
    }

    ngOnDestroy()
    {
        this.onBoardChanged.unsubscribe();
    }
}
