import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SharedMatTableComponent } from 'src/app/shared/component/shared-mat-table/shared-mat-table.component';
import { ColumnInfo } from 'src/app/shared/interface/book-info-interface';


export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {position: '1-1aa', name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: '2-1aa', name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: '3-1aa', name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: '4-1aa', name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: '5-1aa', name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: '6-1aa', name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: '7-1aa', name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: '8-1aa', name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: '9-1aa', name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: '10-1aa', name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  @ViewChild('aa') matTable: SharedMatTableComponent;

  public bookList: any;
  public bookLists: any;
  public baseBookListUrl = '/books';
  public naverOpenAPIUrl = '/books/naver/search';

  displayedColumns: string[];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource2 = ELEMENT_DATA;

  columnInfoList: ColumnInfo [] = [
    { header : ' Tag     ', binding : 'tag' },
    { header : ' Name ', binding : 'name' },
    { header : ' 대출 ', binding : 'loaned', type: 'button', conditionTF: {trueValue: '대출 가능', falseValue: '대출 불가'} },
    { header : ' 연장여부 ', binding : 'loanedExtended' },
    { header : ' 대출자 ', binding : 'loanedUser' },
    { header : ' 반납일 ', binding : 'returnDate' },
    // { header : ' 기한연장 ', binding : 'returnDateExtended' },
    // { header : ' defaultLoanDay ', binding : 'defaultLoanDay' },
    // { header : ' extendLoanDay ', binding : 'extendLoanDay' },
    { header : '  ISBN ', binding : 'mybookDetail', subBind: 'isbn' },
  ];



  constructor(private http: HttpClient) { }
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.displayedColumns = this.columnInfoList.map(x => x.binding);
    // console.log(this.displayedColumns);
    // console.log(this.columnInfo);
    // this.dataSource.sort = this.sort;
    // console.log(this.matTable);
  }

  ngAfterViewInit(): void {
    this.matTable.openLoading(true);
    console.log(this.matTable);
    this.getBookFromOpenAPI();
    this.getBookList();
  }

  finishNgAfterViewInit(event) {
    console.log(this.matTable);
  }

  test() {
    console.log(this.matTable);
    this.matTable.clearData();
    this.matTable.openLoading(true);
    this.getBookList();
  }

  getBookList(): any {
    this.http.request('GET', this.baseBookListUrl + "/all", {
      withCredentials: true,
      params: {
        title : 'Programming Language'
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
        keyword : 'Programming Language'
      }
    }).subscribe(result => {
      console.log(result);
      this.bookList = result;

      const sample: any = result;
      // this.dataSource = new MatTableDataSource(sample);
      // this.bindData(sample);
    });
  }

  bindData(data) {
    this.matTable.bindData(data);
  }

}
