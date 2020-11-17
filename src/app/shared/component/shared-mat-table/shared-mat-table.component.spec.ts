import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedMatTableComponent } from './shared-mat-table.component';

describe('SharedMatTableComponent', () => {
  let component: SharedMatTableComponent;
  let fixture: ComponentFixture<SharedMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
