import { NgModule } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatFormField } from '@angular/material';
import { CommonSharedModule } from 'src/app/shared/component/common-shared.module';
import { RegisterComponent } from './register.component';

@NgModule({
    declarations: [
        RegisterComponent,
        MatFormField,
        NgModel,
        NgForm
    ],
    imports: [
        CommonSharedModule
    ],
    //  providers: [
    //      GlobalErrorHandlerService,
    //      { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
    //  ]
})

export class RegisterModule {
}
