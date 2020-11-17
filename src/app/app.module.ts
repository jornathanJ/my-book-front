import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonSharedModule } from './shared/component/common-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { AuthenticationService } from './shared/service/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { BookListModule } from './pages/book-list/book-list.module';
import { myRxStompConfig } from './shared/stomp/my-rx-stomp.config';
import { DataSharedService } from './shared/service/dataShareService';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

//    CommonMaterialModule,// By myself:
    CommonSharedModule,// By myself:
    BookListModule,// By myself:
    ReactiveFormsModule,// By myself: for formGroup

    TranslateModule.forRoot()
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
    DataSharedService,
    AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // constructor(
  //   ngRedux: NgRedux<Map<string, any>>,
  //   devTools: DevToolsExtension){
  //     const enhancers = isDevMode() ? [devTools.en]
  //   }
}
