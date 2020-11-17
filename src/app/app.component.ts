import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatSidenavContainer, MatSidenav } from '@angular/material';
import { slideInAnimation } from './animations';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './shared/service/authentication.service';
import { BookDetailComponent } from './shared/component/book-detail/book-detail.component';
import { User, UserMaker } from './shared/class/user';
import { DataSharedService } from './shared/service/dataShareService';
import { EventInfo } from './shared/interface/event-info.interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sideNavMenu: MatSidenav;
  @ViewChild('sidenavDetail') sideNavBookDetail: MatSidenav;

  @ViewChild('bookDetail') bookDetail: BookDetailComponent;

  title = 'my-book-library';

  alive = true;

  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  loginUser: User;
  notificationCount: number = 0;

  constructor(private sharedService: DataSharedService,
              private translate: TranslateService,
              private authenticationService: AuthenticationService ) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    this.loginUser = UserMaker.initialize();
  }

  ngOnDestroy() {
    this.sharedService = null;
  }

  ngAfterViewInit() {
    this.sharedService.changeEmitted$
    .subscribe(
      (eventInfo: EventInfo) => {
        console.log(eventInfo);

        if (eventInfo.eventName === 'ROW_CLICKED') {
          this.bookDetail.showBookInfo(eventInfo.eventData);
          this.sideNavBookDetail.toggle(true);
        }
      });

    this.authenticationService.currentUser$
    .subscribe((userData : User) => {
      console.log("loginUser is " + userData);
      this.loginUser = userData;
    });
  }

  toggle() {
    try {
      if (this.sideNavMenu) {
        this.sideNavMenu.toggle();
      }
    } catch (e) {
      console.log(e);
    }
  }

  toggleChanged(event) {

  }

  bookDetailButtonClicked(event: string) {
    this.sideNavBookDetail.toggle();
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
