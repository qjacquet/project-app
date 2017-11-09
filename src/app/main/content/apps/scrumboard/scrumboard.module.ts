import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ScrumboardComponent } from './scrumboard.component';
import { BoardResolve, ScrumboardService } from './scrumboard.service';
import { ScrumboardBoardComponent } from './board/board.component';
import { ScrumboardBoardListComponent } from './board/list/list.component';
import { ScrumboardBoardCardComponent } from './board/list/card/card.component';
import { ScrumboardBoardEditListNameComponent } from './board/list/edit-list-name/edit-list-name.component';
import { ScrumboardBoardAddCardComponent } from './board/list/add-card/add-card.component';
import { ScrumboardBoardAddListComponent } from './board/add-list/add-list.component';
import { ScrumboardCardDialogComponent } from './board/dialogs/card/card.component';
import { ScrumboardLabelSelectorComponent } from './board/dialogs/card/label-selector/label-selector.component';
import { ScrumboardEditBoardNameComponent } from './board/edit-board-name/edit-board-name.component';
import { ScrumboardBoardSettingsSidenavComponent } from './board/sidenavs/settings/settings.component';
import { ScrumboardBoardColorSelectorComponent } from './board/sidenavs/settings/board-color-selector/board-color-selector.component';

const routes: Routes = [
    {
        path     : 'boards',
        component: ScrumboardComponent,
        resolve  : {
            scrumboard: ScrumboardService
        }
    },
    {
        path     : 'boards/:boardId/:boardUri',
        component: ScrumboardBoardComponent,
        resolve  : {
            board: BoardResolve
        }
    },
    {
        path      : '**',
        redirectTo: 'boards'
    }
];

@NgModule({
    declarations   : [
        ScrumboardComponent,
        ScrumboardBoardComponent,
        ScrumboardBoardListComponent,
        ScrumboardBoardCardComponent,
        ScrumboardBoardEditListNameComponent,
        ScrumboardBoardAddCardComponent,
        ScrumboardBoardAddListComponent,
        ScrumboardCardDialogComponent,
        ScrumboardLabelSelectorComponent,
        ScrumboardEditBoardNameComponent,
        ScrumboardBoardSettingsSidenavComponent,
        ScrumboardBoardColorSelectorComponent
    ],
    imports        : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers      : [
        ScrumboardService,
        BoardResolve
    ],
    entryComponents: [ScrumboardCardDialogComponent]
})
export class ScrumboardModule
{
}
