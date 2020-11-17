import { NgModule } from '@angular/core';
import { CommonMaterialModule } from 'src/app/shared/component/common-material.module';
import { CommonSharedModule } from 'src/app/shared/component/common-shared.module';
// import { SharedComponentModule } from '../shared/component/shared-component.module';
// import { BookListComponent } from './book-list.component';
// import { MaterialTableComponent } from '../shared/component/material-table/material-table.component.ts.old';

import { BookListComponent } from './book-list.component';

@NgModule({
    declarations: [
        BookListComponent
    ],
    imports: [
        CommonSharedModule
    ],
    //  providers: [
    //      GlobalErrorHandlerService,
    //      { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
    //  ]
})

export class BookListModule {
}
