import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatSidenavContainer, MatSidenav } from '@angular/material';
import { slideInAnimation } from './animations';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './shared/service/authentication.service';
import { BookDetailComponent } from './shared/component/book-detail/book-detail.component';
import { User, UserMaker } from './shared/class/user';
import { DataSharedService } from './shared/service/dataShareService';
import { EventInfo, EVENT_NAME } from './shared/interface/event-info.interface';
import { MyBookService } from './shared/service/my-book.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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
              private authenticationService: AuthenticationService,
              private myBookService: MyBookService ) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
  ngOnInit(): void {
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

        if (eventInfo.eventName === EVENT_NAME.ROW_CLICKED) {
          this.bookDetail.showBookInfo(eventInfo.eventData);
          this.sideNavBookDetail.toggle(true);
        }

        if (eventInfo.eventName === EVENT_NAME.BUTTON_CLICKED) {
          // TODO : 대출 시작
          this.myBookService.loanBook(this.loginUser, eventInfo.eventData)
          .subscribe(
            data => alert(data),
            error => alert(error)
          );
        }
      });

    this.authenticationService.currentUser$
    .subscribe((userData : User) => {
      console.log("loginUser is " + userData);
      this.loginUser = userData;
    });

    this.sharedService.userEventEmitted$
    .subscribe(changedUser => this.loginUser = changedUser);
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
