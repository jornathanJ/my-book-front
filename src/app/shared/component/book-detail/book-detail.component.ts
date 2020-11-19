import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookInfoListResult, MybookDetail, MyBook } from '../../interface/book-info-interface';

/**
 * Naver Open API를 사용해서 책의 정보를 가져오는 기능입니다.
 * 추가로 naver의 책 정보로 브라우저를 열어 주는 기능이 있습니다.
 * 저장 버튼 클릭시에는 현재 선택한 책의 정보를 database에 적재 합니다. 
 */
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Output() buttonClicked = new EventEmitter<string>();
  public bookAPIUrl = '/books/book';
  public naverOpenAPIUrl = '/books/naver/search';
  public bookInfo: BookInfoListResult = {};
  isLoading = false;
  public currentBook: MyBook;
  public currentBookDetail: MybookDetail;

  emptyItem: MybookDetail = {
    title: '',
    author: '',
    image: '',
    description: '',
    pubdate: '',
    isbn: '',
  };

  constructor(private http: HttpClient) {
    this.bookInfo = {};
    this.bookInfo.items = [];
    this.bookInfo.items[0] = this.emptyItem;
  }

  ngOnInit() {
  }

  hide() {
    this.buttonClicked.emit('HIDE');
  }

  showBookInfo(selectedBook: MyBook) {
    this.isLoading = true;
    this.currentBook = selectedBook;

    // data 초기화
    if (this.bookInfo !== undefined && this.bookInfo != null) {
      this.bookInfo.items = [];
      this.bookInfo.items.push(this.emptyItem);
    } else {
      // TODO: ?? 머 해야 하지?this.bookInfo = {};
    }

    if (selectedBook.hasDetailInfo) {
      console.log('Already saved data.');

      this.http.get<MyBook>(`${this.bookAPIUrl}/${selectedBook.id}`)
      .subscribe(bookData => {
        this.bookInfo.items = [];
        this.bookInfo.items.push(bookData.mybookDetail);
        this.isLoading = false;
        return;
      });
    }

    this.http.request<BookInfoListResult>('GET', this.naverOpenAPIUrl + '/d_titl', {
      withCredentials: true,
      params: {
        keyword: selectedBook.title
      }
    }).subscribe(result => {
      console.log(result);
      this.bookInfo = result;
      this.isLoading = false;

      if (this.bookInfo && this.bookInfo.items && this.bookInfo.items.length > 0) {
        this.currentBook.mybookDetail = this.bookInfo.items[0];
      }

      // this.bookList = result;

      // const sample: any = result;
      // // this.dataSource = new MatTableDataSource(sample);
      // this.bindData(sample);
      // this.matTable.openLoading(false);
    });
  }

  saveBookDetail() {
    this.currentBook.mybookDetail.tag = this.currentBook.id;
    this.http.request<BookInfoListResult>('PATCH', this.bookAPIUrl, {
      withCredentials: true,
      body: this.currentBook
    }).subscribe(result => {
      console.log(result);

    });
  }
}
