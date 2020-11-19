import { TestBed } from '@angular/core/testing';

import { MyBookService } from './my-book.service';

describe('MyBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyBookService = TestBed.get(MyBookService);
    expect(service).toBeTruthy();
  });
});
