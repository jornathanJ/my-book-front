import { Action } from '@ngrx/store';
import { MyBook } from '../interface/book-info-interface';

export const GET_BOOKS_ALL= '[Book-list] Load All Books';
export const GET_BOOKS_ALL_SUCCESS = '[MyBooks API] myBook Loaded Success';

export class GetMyBooksListAction implements Action {
  readonly type = GET_BOOKS_ALL;
}

export class GetMyBooksListSuccessAction implements Action {
  readonly type = GET_BOOKS_ALL_SUCCESS;
  constructor(public myBookList?: MyBook[]) {}
}

// export class GetPnuCityListAction implements Action {
//   readonly type = GET_PNU_CITY;
//   constructor(public addr?: string) {}
// }

// export class GetPnuCityListSuccessAction implements Action {
//   readonly type = GET_PNU_CITY_SUCCESS;
//   constructor(public cityList?: PwpPnuModel[]) {}
// }

export type ALL_BOOKS_ACTION = GetMyBooksListAction | GetMyBooksListSuccessAction; //| GetPnuCityListAction | GetMyBooksListSuccessAction | GetPnuCityListSuccessAction;