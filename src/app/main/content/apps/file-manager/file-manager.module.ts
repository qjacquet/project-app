import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';
import { FileManagerService } from './file-manager.service';
import { FileManagerFileListComponent } from './file-list/file-list.component';
import { FileManagerMainSidenavComponent } from './sidenavs/main/main.component';
import { FileManagerDetailsSidenavComponent } from './sidenavs/details/details.component';

const routes: Routes = [
    {
        path     : '**',
        component: FileManagerComponent,
        children : [],
        resolve  : {
            files: FileManagerService
        }
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        FileManagerComponent,
        FileManagerFileListComponent,
        FileManagerMainSidenavComponent,
        FileManagerDetailsSidenavComponent
    ],
    providers   : [
        FileManagerService
    ]
})
export class FileManagerModule
{
}
