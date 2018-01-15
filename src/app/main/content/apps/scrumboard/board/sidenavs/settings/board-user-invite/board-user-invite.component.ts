import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScrumboardService } from '../../../../scrumboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../../../../../../core/models/user';
import { AuthService } from '../../../../../../../../core/services/auth.service';
import { Utils } from '../../../../../../../../core/utils';

@Component({
    selector   : 'scrumboard-board-user-invite',
    templateUrl: './board-user-invite.component.html',
    styleUrls  : ['./board-user-invite.component.scss']
})
export class ScrumboardBoardUserInviteComponent implements OnInit, OnDestroy
{
    inviteForm: FormGroup;
    inviteFormErrors: any;

    board: any;
    onBoardChanged: Subscription;
    users: User[];    
    currentUser: User;

    constructor(
        private scrumboardService: ScrumboardService,
        private formBuilder: FormBuilder,
        private authService: AuthService
    )
    {
        this.currentUser = authService.getCurrentUser();
        this.inviteFormErrors = {
            email   : {},
            message: {},
            global  : {}
        };

        scrumboardService
            .getUsers()
            .then((data) => {
                this.users = data;
            })
            .catch((ex) => {
            })
    }

    ngOnInit()
    {
        this.onBoardChanged =
            this.scrumboardService.onBoardChanged
                .subscribe(board => {
                    this.board = board;
                });

        this.inviteForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            message: ['', Validators.nullValidator]
        });

        this.inviteForm.valueChanges.subscribe(() => {
            this.onInviteFormValuesChanged();
        });
    }

    onInviteFormValuesChanged()
    {
        for ( const field in this.inviteFormErrors )
        {
            if ( !this.inviteFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.inviteFormErrors[field] = {};

            // Get the control
            const control = this.inviteForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.inviteFormErrors[field] = control.errors;
            }
        }
    }

    addMember(user: User)
    {
        if (this.board.members.filter(item => item.id === user._id).length === 0) {
            this.board.members.push(this.scrumboardService.getMemberFormat(user, false));
            this.scrumboardService.updateBoard();
        }
    }

    deleteMember(user: User)
    {
        // Delete member from all cards in this board
        for (let i = 0; i < this.board.cards.length; i++){
            this.board.cards[i].idMembers = this.board.cards[i].idMembers.filter(item => item !== user._id);
           // Utils.toggleInArray(user._id, this.board.cards[i].idMembers);
        }

        // Delete member from member selection in this board
        this.board.members = this.board.members.filter(item => item.id !== user._id);

        this.scrumboardService.updateBoard();
    }

    ngOnDestroy()
    {
        this.onBoardChanged.unsubscribe();
    }
}
