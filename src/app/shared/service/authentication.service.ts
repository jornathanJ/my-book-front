import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';
import { User, UserMaker } from '../class/user';


/**
 * 사용자의 로그인/아웃을 지원합니다.
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    //아래의 방식을 사용하면 계속 사용자 정보가 브라우저에 저장되게 됩니다.
    //필요에 의해서 번갈아 사용하면 될 거 같습니다.
    //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserSubject = new BehaviorSubject<User>(UserMaker.initialize());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  } 

  login(username, password): Observable<User> {
    // return this.http.post<User>(`/books/users/authenticate`, { username, password })
    //   .pipe(
    //     map or exhaustMap(user => {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //       return user;
    //     })
    //   );

    this.http.request('POST', '/books/users/authenticate', {
      withCredentials: true,
      params: {
        username: username,
        password: password,
      }
    }).subscribe((user: User) => {
      console.log(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });

    return this.currentUserSubject.asObservable();
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}