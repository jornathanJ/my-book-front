import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { GetMyBooksListSuccessAction, GET_BOOKS_ALL, GET_BOOKS_ALL_SUCCESS } from './my-book.action';
import { MyBookService } from './my-book.service';

@Injectable()
export class MyBookEffects {

  @Effect()
  loadBooks$: Observable<Action> = this.actions$
    // .pipe(
    //   ofType(GET_BOOKS_ALL),
    //   mergeMap(() => this.myBookService.getAll()
    //     .pipe(
    //       map(mybooks => ({ type: GET_BOOKS_ALL_SUCCESS, payload: mybooks })),
    //       catchError(() => of({ type: '[MyBooks API] myBook Loaded Error' }))
    //     ))
    // );
    .pipe(
      ofType(GET_BOOKS_ALL),
      switchMap(() => this.myBookService.getAll()
        .pipe(
          map(result => new GetMyBooksListSuccessAction(result)))
        )
    );

  constructor(
    private actions$: Actions,
    private myBookService: MyBookService
  ) { }
}