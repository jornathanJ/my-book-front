import {createFeatureSelector, createSelector, ActionReducerMap} from '@ngrx/store';
import { MyBook } from '../interface/book-info-interface';
import { ALL_BOOKS_ACTION, GetMyBooksListSuccessAction, GET_BOOKS_ALL_SUCCESS } from './my-book.action';


/**
 * MyBook의 RestAPI에서 사용될 상태들은 여기서 관리
 */

export interface MyBookState {
  myBookList?: MyBook[];
}
export interface MyBookAppState {
  bookState?: MyBookState;
}

export const myBookReducerMap: ActionReducerMap<MyBookAppState> = {
  bookState: myBookReducer
};

export const initialStateMyBook: MyBookState = { myBookList: []};

export function myBookReducer(state = initialStateMyBook, action: ALL_BOOKS_ACTION): MyBookState {
  switch (action.type) {
    case GET_BOOKS_ALL_SUCCESS: {
      const searchedBookList = (<GetMyBooksListSuccessAction>action).myBookList;
      return {...state, myBookList: searchedBookList};
    }
    default: {
      return state;
    }
  }
}

export const getMyBooksState = createFeatureSelector<MyBookState>('bookState');

export const getMyBookSelector = createSelector(getMyBooksState, (state: MyBookState) => {
  return state.myBookList;
});
