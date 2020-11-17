import { Component, OnInit, ViewChild, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EventInfo } from '../../interface/event-info.interface';
import { DataSharedService } from '../../service/dataShareService';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * Angular meterial의 table을 사용하는 내용만 간단히 만들어 봤습니다.
 */
@Component({
  selector: 'app-shared-mat-table',
  templateUrl: './shared-mat-table.component.html',
  styleUrls: ['./shared-mat-table.component.css']
})
export class SharedMatTableComponent implements OnInit, AfterViewInit {

  @Input() columnInfoList: any[];
  @Output() loadEvent: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  isLoading = true;

  TYPE = 'type';

  constructor(private sharedService: DataSharedService) { }
  ngAfterViewInit(): void {
    console.log(this.sort);
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
    this.displayedColumns = this.columnInfoList.map(x => x.binding);
    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  btnClicked(row) {
    console.log('Row button clicked: ', row);
    const eventInfo: EventInfo = {
      eventData: row,
      eventName: 'BUTTON_CLICKED'
    };
    this.sharedService.emitChange(eventInfo);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
    const eventInfo: EventInfo = {
      eventData: row,
      eventName: 'ROW_CLICKED'
    };
    this.sharedService.emitChange(eventInfo);
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

    if (columnType === 'button') {
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

}
