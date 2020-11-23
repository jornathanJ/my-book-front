import { Component, OnInit, ViewChild, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ColumnInfo } from '../../interface/book-info-interface';
import { EventInfo, EVENT_NAME } from '../../interface/event-info.interface';
import { DataSharedService } from '../../service/dataShareService';

import { SelectionModel } from "@angular/cdk/collections";

export interface TableRow {
  id: number;
  col1: string;
  col2: string;
}


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

/**
 * Angular meterial의 table을 사용하는 내용만 간단히 만들어 봤습니다.
 */
@Component({
  selector: 'app-shared-mat-table',
  templateUrl: './shared-mat-table.component.html',
  styleUrls: ['./shared-mat-table.component.css']
})
export class SharedMatTableComponent implements OnInit, AfterViewInit {

  @Input() columnInfoList: ColumnInfo[];

  @Output() loadEvent: EventEmitter<string> = new EventEmitter();
  @Output() buttonClicked: EventEmitter<EventInfo> = new EventEmitter();
  @Output() rowClicked: EventEmitter<EventInfo> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [];
  dataColumns: ColumnInfo[] = [];
  dataSource = new MatTableDataSource([]);
  isLoading = true;
  TYPE = 'type';

  bShowSelectCheckBox = false;
  selection = new SelectionModel<any>(true, []);

  constructor(private sharedService: DataSharedService) { }


  ngAfterViewInit(): void {
    console.log(this.sort);
    this.displayedColumns = this.columnInfoList.map(x => x.binding);

    this.dataColumns = this.columnInfoList
      .filter(x => {
        if ( x.binding != 'select'){
          return true;
        } else {
          this.bShowSelectCheckBox = true;
          return false
        }
      })
      .map(x => x);
    this.loadEvent.emit('Finished');
  }

  ngOnInit() {
    console.log(this.sort);
  }

  // ngAfterViewInit() {
  //   console.log(this.sort);
  //   this.loadEvent.emit('finished');
  // }

  bindData(dataSource: any[]) {

    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * 현재 선택된 버튼의 정보를 가져 옵니다. 클릭된 값을 사용하려면 rowData[bindingName] 을 사용하면 될 거 같다.
   *
   * @param rowData 현재 Row data 전체
   * @param bindingName rowData중에서 ColumnInfo.binding에 설정한 값
   */
  btnClicked(rowData: any, bindingName: string, bindingValue: any) {
    console.log(`Row button clicked: ${bindingName} and ${rowData[bindingName]}`);
    const eventInfo: EventInfo = {
      eventData: rowData,
      eventName: EVENT_NAME.BUTTON_CLICKED,
      identifier: bindingName,
      value: bindingValue
    };
    this.sharedService.emitChange(eventInfo);
    if (this.buttonClicked != undefined && this.buttonClicked != null){
      this.buttonClicked.emit(eventInfo);
    }
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
    const eventInfo: EventInfo = {
      eventData: row,
      eventName: EVENT_NAME.ROW_CLICKED
    };
    this.sharedService.emitChange(eventInfo);
    if (this.rowClicked != undefined && this.rowClicked != null){
      this.rowClicked.emit(eventInfo);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openLoading(value: boolean) {
    this.isLoading = value;
  }

  clearData() {
    this.dataSource = null;
  }

  checkTextExist(columnType: string, bindingName: string, subBind: string, data: any): string {

    if (columnType === 'button' || columnType === 'buttonTF' || columnType === 'booleanText' || columnType === 'chips') {
      return '';
    }

    if (data && data[bindingName] && data[bindingName][subBind]) {
      return data[bindingName][subBind];
    } else if (data && data[bindingName]) {
      return data[bindingName];
    } else {
      return '';
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
