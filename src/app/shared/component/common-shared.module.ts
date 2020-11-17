import { NgModule } from '@angular/core';
import { SharedMatTableComponent } from './shared-mat-table/shared-mat-table.component';
import { CommonMaterialModule } from './common-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { MessagesComponent } from './messages/messages.component';

/**
 * 이 폴더 안에 있는 모든 Component를 여기서 export 합니다. --> share/component에 추가되는 모든 component는 app.module.ts에는 추가 하지 않습니다.
 * 이래저래 추가하면 되게 헷갈려요
 * 특히 CommonMaterialModule 는 내용이 너무 많아서 따로 지정 했습니다.
 * 신규로 추가하는 Component나 module의 경우 이 module을 import 하면 됩니다.
 */
@NgModule({
    imports: [
        CommonMaterialModule,
    ],
    // providers:    [ Logger ],
    declarations: [
        BookDetailComponent,
        MessagesComponent,
        SharedMatTableComponent
    ],
    exports: [
        TranslateModule,
        CommonMaterialModule,
        BookDetailComponent,
        MessagesComponent,
        SharedMatTableComponent
    ],
    // bootstrap:    [ AppComponent ]
})
export class CommonSharedModule { }
