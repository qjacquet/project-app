import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Animations } from '../../../../../../core/animations';

@Component({
    selector   : 'todo-main-sidenav',
    templateUrl: './main-sidenav.component.html',
    styleUrls  : ['./main-sidenav.component.scss'],
    animations : Animations
})
export class TodoMainSidenavComponent implements OnInit, OnDestroy
{
    folders: any[];
    filters: any[];
    tags: any[];
    accounts: object;
    selectedAccount: string;

    onFiltersChanged: Subscription;
    onTagsChanged: Subscription;

    constructor(private todoService: TodoService, private router: Router)
    {
        // Data
        this.accounts = {
            'qjacquet'    : 'johndoe@fake.com'
        };

        this.selectedAccount = 'qjacquet';
    }

    ngOnInit()
    {
        this.onFiltersChanged =
            this.todoService.onFiltersChanged
                .subscribe(filters => {
                    this.filters = filters;
                });

        this.onTagsChanged =
            this.todoService.onTagsChanged
                .subscribe(tags => {
                    this.tags = tags;
                });
    }

    ngOnDestroy()
    {
        this.onFiltersChanged.unsubscribe();
        this.onTagsChanged.unsubscribe();
    }

    newTodo()
    {
        this.router.navigate(['/apps/todo/all']).then(() => {
            setTimeout(() => {
                this.todoService.onNewTodoClicked.next('');
            });
        });
    }
}
