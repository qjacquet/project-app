import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../../core/services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user';
import { Utils } from '../../../../core/utils';
import { Board } from './board.model';

@Injectable()
export class ScrumboardService implements Resolve<any>
{
    boards: any[];
    joinedBoards: Board[];
    ownedBoards: Board[];
    routeParams: any;
    board: any;
    currentUser : User;

    onBoardsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onBoardChanged: BehaviorSubject<any> = new BehaviorSubject([]);

    constructor(
        private http: HttpService,
        private router: Router,
        private authService: AuthService
    )
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;
        this.currentUser = this.authService.getCurrentUser();
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getBoards()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getBoards(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(Utils.getApiUri('/scrumboards/'))
                .subscribe((response: any) => {
                    this.boards = response;
                    this.onBoardsChanged.next(this.boards);
                    resolve(this.boards);
                }, reject);
        });
    }

    getBoard(boardId): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(Utils.getApiUri('/scrumboards/') + boardId)
                .subscribe((response: any) => {
                    this.board = response;
                    this.onBoardChanged.next(this.board);
                    resolve(this.board);
                }, reject);
        });
    }

    getUsers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(Utils.getApiUri('/users/'))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addCard(listId, newCard)
    {
        this.board.lists.map((list) => {
            if ( list.id === listId )
            {
                return list.idCards.push(newCard.id);
            }
        });

        this.board.cards.push(newCard);

        return this.updateBoard();
    }

    addList(newList)
    {

        this.board.lists.push(newList);

        return this.updateBoard();

    }

    removeList(listId)
    {
        const list = this.board.lists.find((_list) => {
            return _list.id === listId;
        });

        for ( const cardId of list.idCards )
        {
            this.removeCard(cardId);
        }

        const index = this.board.lists.indexOf(list);

        this.board.lists.splice(index, 1);

        return this.updateBoard();
    }

    removeCard(cardId, listId?)
    {

        const card = this.board.cards.find((_card) => {
            return _card.id === cardId;
        });

        if ( listId )
        {
            const list = this.board.lists.find((_list) => {
                return listId === _list.id;
            });
            list.idCards.splice(list.idCards.indexOf(cardId), 1);
        }

        this.board.cards.splice(this.board.cards.indexOf(card), 1);

        this.updateBoard();
    }

    updateBoard()
    {
        return new Promise((resolve, reject) => {
            this.http.put(Utils.getApiUri('/scrumboards/') + this.board._id, this.board)
                .subscribe(response => {
                    this.onBoardChanged.next(this.board);
                    resolve(this.board);
                }, reject);
        });
    }

    deleteBoard()
    {
        return new Promise((resolve, reject) => {
            this.http.delete(Utils.getApiUri('/scrumboards/') + this.board._id)
                .subscribe(response => {
                    this.onBoardChanged.next(this.board);
                    this.router.navigate(['/apps/scrumboard/boards']);
                }, reject);
        });
    }

    updateCard(newCard)
    {
        this.board.cards.map((_card) => {
            if ( _card.id === newCard.id )
            {
                return newCard;
            }
        });

        this.updateBoard();
    }

    createNewBoard(board)
    {
        this.setNewBoard(board);

        return new Promise((resolve, reject) => {
            this.http.post(Utils.getApiUri('/scrumboards/'), board)
                .subscribe(response => {
                    board = response;
                    this.router.navigate(['/apps/scrumboard/boards/' + board._id]);
                }, reject);
        });
    }

    setNewBoard(board)
    {
        board.members = [this.getMemberFormat(this.currentUser, true)]
    }

    getMemberFormat(user: User, isOwner): any
    {
        return {
            _id: user.id || user._id,
            id: user._id|| user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            owner: isOwner
        }
    }


}

@Injectable()
export class BoardResolve implements Resolve<any>
{

    constructor(private scrumboardService: ScrumboardService)
    {
    }

    resolve(route: ActivatedRouteSnapshot)
    {
        return this.scrumboardService.getBoard(route.paramMap.get('boardId'));
    }
}
