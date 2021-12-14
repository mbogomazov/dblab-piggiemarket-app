import { Component, Input, OnInit, Output, ViewChild, EventEmitter, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomerDto, DataDto, DealDto, DeliveryDto, ProductDto } from '@dblab/dto';
import DisplayedColumn from '../../../model/columns/displayedcolumns.model';
import { ChangeDataDialogComponent } from '../dialogs/change-data-dialog/change-data-dialog.component';

@Component({
  selector: 'dblab-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
// implements OnInit
export class TableViewComponent implements OnInit, OnChanges  {

  @Input() displayedColumns: {name: string, title: string}[] = [];
  @Input() dataSet!: CustomerDto[] | DealDto[] | DeliveryDto[] | ProductDto[];
  @ViewChild(MatTable) table!: MatTable<CustomerDto[] | DealDto[] | DeliveryDto[] | ProductDto[]>;
  @Output() deleteRowEvent = new EventEmitter<DataDto>();
  @Output() updateRowEvent = new EventEmitter<DataDto>();
  displayedColumnsIds: string[] = [];
  dataSource!: MatTableDataSource<DataDto>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.displayedColumns.push({
      name: 'deleteRow',
      title: 'Удалить'
    })
    this.displayedColumnsIds = this.displayedColumns.map(col => col.name);
    this.dataSource = new MatTableDataSource<DataDto>(this.dataSet);
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<DataDto>(this.dataSet);
  }

  openDialog(column: DisplayedColumn, element: DataDto) {
    const dialogRef = this.dialog.open(ChangeDataDialogComponent, {
      width: '450px',
      data: {
        column,
        element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result)
        return;
      this.updateRowEvent.emit(element);
    });
  }

  deleteRow(element: DataDto) {
    this.deleteRowEvent.emit(element);
  }

  filterTableByString(filterStr: string) {
    this.dataSource.filter = filterStr;
  }

}
