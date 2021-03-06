import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ScrumboardService } from '../../../scrumboard.service';
import { Animations } from '../../../../../../../core/animations';

@Component({
    selector   : 'scrumboard-board-settings',
    templateUrl: './settings.component.html',
    styleUrls  : ['./settings.component.scss'],
    animations : Animations
})
export class ScrumboardBoardSettingsSidenavComponent implements OnInit, OnDestroy
{
    board: any;
    view = 'main';
    onBoardChanged: Subscription;

    constructor(
        private scrumboardService: ScrumboardService
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

    toggleCardCover()
    {
        this.board.settings.cardCoverImages = !this.board.settings.cardCoverImages;
        this.scrumboardService.updateBoard();
    }

    toggleSubcription()
    {
        this.board.settings.subscribed = !this.board.settings.subscribed;
        this.scrumboardService.updateBoard();
    }

    deleteBoard(){
        this.scrumboardService.deleteBoard();
    }

    ngOnDestroy()
    {
        this.onBoardChanged.unsubscribe();
    }
}
