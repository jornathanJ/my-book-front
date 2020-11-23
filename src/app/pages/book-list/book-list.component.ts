import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatSidenav } from '@angular/material';
import { SharedMatTableComponent } from 'src/app/shared/component/shared-mat-table/shared-mat-table.component';
import { ColumnInfo, MyBook } from 'src/app/shared/interface/book-info-interface';
import { createAction, State, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MyBookEffects } from 'src/app/shared/service/my-book.effects';
import { filter, map, distinctUntilChanged } from 'rxjs/operators'
import { MyBookAppState, getMyBookSelector } from 'src/app/shared/service/my-book.reducer';
import { GetMyBooksListAction } from 'src/app/shared/service/my-book.action';
import { DataSharedService } from 'src/app/shared/service/dataShareService';
import { User } from 'src/app/shared/class/user';
import { EventInfo } from 'src/app/shared/interface/event-info.interface';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('matTable') matTable: SharedMatTableComponent;
  public bookList: any;
  public baseBookListUrl = '/books';
  public naverOpenAPIUrl = '/books/naver/search';

  columnInfoList: ColumnInfo[] = [
    { header: '', binding: 'select', type: 'select'},
    { header: ' Tag     ', binding: 'id', type: 'normal'},
    { header: ' Title ', binding: 'title' , type: 'normal'},
    { header: ' 대출 ', binding: 'isLoaned', type: 'buttonTF', conditionTF: { trueText: '대출 불가', falseText: '대출 가능' } },
    { header: ' 반납 ', binding: 'temp', type: 'button' },
    { header: ' Status ', binding: 'bookStatus' , type: 'normal'},
    { header: ' 대출자 ', binding: 'currentUserName' , type: 'normal'},
    { header: ' 세부정보 ', binding: 'hasDetailInfo', type: 'booleanText', conditionTF: { trueText: '있음', falseText: '없음' } },
    //{ header: '  ISBN ', binding: 'mybookDetail', subBind: 'isbn' },
  ];

  state: State<MyBook[]>;
  mybooks$: Observable<MyBook[]>;// = this.store.select(state => state.mybooks);
  //mybooks$ = this.store.pipe(select(getPnuProvinces));

  loginUser: User;

  constructor(
    private http: HttpClient,
    private store: Store<MyBookAppState>,
    private sharedService: DataSharedService
  ) {
  }

  ngOnDestroy(): void {
  }
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    //아래와 같이 초기화 하는 방법도 있네?
    //this.mybooks$ = this.store.pipe(select(state => state.mybooks));
    this.mybooks$ = this.store.select(getMyBookSelector);

    this.sharedService.userEventEmitted$
    .subscribe(changedUser => this.loginUser = changedUser);
  }

  ngAfterViewInit(): void {
    
    this.mybooks$
    .pipe(
      distinctUntilChanged((previous: MyBook [], current: MyBook []) => {
        let result: boolean = JSON.stringify(previous) == JSON.stringify(current);
        console.log("distinctUntilChanged :p", previous);
        console.log("distinctUntilChanged :q", current);
        console.log("distinctUntilChanged result : ", result);
        if (result == true){
          if (this.matTable.dataSource == null || this.matTable.dataSource.data == null){
            this.bookList = current;
            this.bindData(this.bookList );
          }
          this.matTable.openLoading(false);
        }
        return result;
      })
      )
    .subscribe((list) => {
      if (list.length == 0) {
        return;
      }
      console.log("this.store.select(", this.store);
      console.log("this.store.select(", list);
      this.bookList = list;
      this.bindData(this.bookList );
      this.matTable.openLoading(false);
    });
    // this.displayedColumns = this.columnInfoList.map(x => x.binding);
    // console.log(this.displayedColumns);
    // console.log(this.columnInfo);
    // this.dataSource.sort = this.sort;
    // console.log(this.matTable);
    this.mybooks$.subscribe((data) => {
      if (data.length == 0) {
        return;
      }
      console.log("this.mybooks$.subscribe", data)
    });

    //this.store.dispatch(new GetMyBooksListAction());
    this.refreshBookList();
    console.log(this.matTable);
    //this.getBookFromOpenAPI();
    //this.getBookList_OLD();
  }

  finishNgAfterViewInit(event) {
    console.log(this.matTable);
  }

  refreshBookList() {
    console.log(this.matTable);
    this.matTable.clearData();
    this.matTable.openLoading(true);

    this.store.dispatch(new GetMyBooksListAction());
  }

  getBookList(): any {
  }

  getBookList_OLD(): any {
    this.http.request('GET', this.baseBookListUrl + "/all", {
      withCredentials: true,
      params: {
        title: 'Programming Language'
      }
    }).subscribe(result => {
      console.log(result);
      this.bookList = result;

      const sample: any = result;
      // this.dataSource = new MatTableDataSource(sample);
      this.bindData(sample);
      this.matTable.openLoading(false);
    });
  }

  getBookFromOpenAPI(): any {
    this.http.request('GET', this.naverOpenAPIUrl + '/d_titl', {
      withCredentials: true,
      params: {
        keyword: 'Programming Language'
      }
    }).subscribe(result => {
      console.log(result);
      this.bookList = result;

      const sample: any = result;
      // this.dataSource = new MatTableDataSource(sample);
      // this.bindData(sample);
    });
  }

  bindData(dataSource: any[]) {
    this.matTable.bindData(dataSource);
  }

  buttonClickedEvent(event: EventInfo){
    console.log(`buttonClickedEvent fired: ${event}`);
  }

  rowClickedEvent(event: EventInfo){
    console.log(`rowClickedEvent fired: ${event}`);
  }

}
