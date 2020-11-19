import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';
import { MyBook } from '../interface/book-info-interface';

@Injectable({
  providedIn: 'root'
})
export class MyBookService {

  constructor (private http: HttpClient) {}

  getAll(): Observable<MyBook[]>{
    //return this.http.// .('/books/all');
    //return this.http.get<MyBook[]>('/books/all');
    return this.http.get<MyBook[]>('/books/all');
  }

  loanBook(user: User, selectBook: MyBook){
    return this.http.post<any>(`/books/loan/${user.id}`, selectBook);
  }

  saveUser(user: User) : Observable<User>{
    return this.http.post<User>('/books/user', user);
  }

  findUser(id: String) : Observable<User>{
    return this.http.get<User>(`/books/user/${id}`);
  }
}
