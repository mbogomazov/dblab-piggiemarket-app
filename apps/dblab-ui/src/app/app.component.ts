import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  CustomerDto,
  DataDto,
  DealDto,
  DeliveryDto,
  ProductDto,
} from '@dblab/dto';
import { HttpClient } from '@angular/common/http';
import DisplayedColumn from '../model/columns/displayedcolumns.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AddDataDialogComponent } from './components/dialogs/add-data-dialog/add-data-dialog.component';
import tabs from '../model/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableViewComponent } from './components/table-view/table-view.component';

const BACK_URL = '/api';

@Component({
  selector: 'dblab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChildren('tableView') tableViews!: QueryList<TableViewComponent>;

  tabs = tabs;
  currentTabDto: DisplayedColumn[] = this.tabs[0].displayedColumns;
  currentTabIndex = 0;
  currentFilter = this.currentTabDto[1].title;

  constructor(
    private http$: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getTablesData();
  }

  getTablesData() {
    for (const tab of this.tabs) {
      this.http$
        .get<CustomerDto[] | DeliveryDto[] | DealDto[] | ProductDto[]>(
          `${BACK_URL}/getallrows`,
          {
            params: {
              tableName: tab.tableName,
            },
          }
        )
        .subscribe({
          next: (newData) => {
            tab.dataSet = newData;
            if (tab.tableName === 'Deal') {
              tab.dataSet.map((row) => {
                (row as DealDto).customer_id = (row as DealDto).customer?.id;
                (row as DealDto).product_id = (row as DealDto).product?.id;
                (row as DealDto).delivery_id = (row as DealDto).delivery?.id;
                return row;
              });
            }
            const currentTableView =
              this.tableViews.toArray()[this.currentTabIndex];
            currentTableView.table.renderRows();
          },
          error: console.log,
        });
    }
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.currentTabIndex = tabChangeEvent.index;
    this.currentTabDto = this.tabs[this.currentTabIndex].displayedColumns;
    this.currentFilter = this.currentTabDto[1].title;
  }

  openAddRowDialog() {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {
      width: '450px',
      data: this.currentTabDto,
    });

    dialogRef.afterClosed().subscribe((row) => {
      if (!row) return;

      const currentTab = this.tabs[this.currentTabIndex];
      if (currentTab.tableName === 'Deal') {
        row = this.updateDealRelations(row as unknown as DealDto) as DealDto;
      }

      this.http$
        .post(`${BACK_URL}/addRow`, {
          tableName: currentTab.tableName,
          row: row,
        })
        .subscribe({
          next: (row) => {
            const currentDataSet = currentTab.dataSet;
            (row as DealDto).customer_id = (row as DealDto).customer?.id;
            (row as DealDto).product_id = (row as DealDto).product?.id;
            (row as DealDto).delivery_id = (row as DealDto).delivery?.id;
            currentDataSet.push(
              row as CustomerDto & DealDto & DeliveryDto & ProductDto
            );
            const currentTableView =
              this.tableViews.toArray()[this.currentTabIndex];
            currentTableView.table.renderRows();
            this.snackBar.open('Столбец был добавлен', 'Закрыть', {
              duration: 3000,
            });
          },
          error: (err) => console.log(err),
        });
    });
  }

  deleteRow(row: DataDto) {
    const currentTab = this.tabs[this.currentTabIndex];
    this.http$
      .post(`${BACK_URL}/deleteRow`, {
        tableName: currentTab.tableName,
        row: row,
      })
      .subscribe({
        next: () => {
          const currentTab = this.tabs[this.currentTabIndex];
          const currentDataSet = currentTab.dataSet;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          currentTab.dataSet = (currentDataSet as any).filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (el: any) =>
              el[currentTab.primaryKeyColName] !=
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (row as any)[currentTab.primaryKeyColName]
          );

          const currentTableView =
            this.tableViews.toArray()[this.currentTabIndex];
          currentTableView.table.renderRows();
          this.snackBar.open('Столбец был удалён', 'Закрыть', {
            duration: 3000,
          });
        },
        error: (err) => console.log(err),
      });
  }

  updateRow(row: DataDto) {
    const currentTab = this.tabs[this.currentTabIndex];
    if (currentTab.tableName === 'Deal')
      row = this.updateDealRelations(row as DealDto);

    this.http$
      .post(`${BACK_URL}/updateRow`, {
        tableName: currentTab.tableName,
        row: row,
      })
      .subscribe({
        complete: () => {
          this.snackBar.open('Значение стобца обновлено', 'Закрыть', {
            duration: 3000,
          });
        },
        error: (err) => console.log(err),
      });
  }

  updateDealRelations(row: DealDto) {
    row.customer = (this.tabs[0].dataSet as CustomerDto[]).filter(
      (customerRow) => customerRow.id == row.customer_id
    )[0];
    row.delivery = (this.tabs[2].dataSet as DeliveryDto[]).filter(
      (deliveryRow) => deliveryRow.id == row.delivery_id
    )[0];
    row.product = (this.tabs[3].dataSet as ProductDto[]).filter(
      (productRow) => productRow.id == row.product_id
    )[0];

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    row.customer_id = parseInt(row.customer_id!.toString());
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    row.product_id = parseInt(row.product_id!.toString());
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    row.delivery_id = parseInt(row.delivery_id!.toString());
    return row;
  }

  filterCurrentTable(filterTableString: string) {
    const currentTableView = this.tableViews.toArray()[this.currentTabIndex];
    currentTableView.filterTableByString(filterTableString);
  }

  truncAllTables() {
    this.http$.post(`${BACK_URL}/truncAllTables`, {}).subscribe({
      complete: () => {
        for (const tab of this.tabs) {
          tab.dataSet = [];
        }
        this.snackBar.open('Все таблицы были очищены', 'Закрыть', {
          duration: 3000,
        });
      },
      error: (err) => console.log(err),
    });
  }

  dropDb() {
    this.http$.post(`${BACK_URL}/dropDb`, {}).subscribe({
      complete: () => {
        for (const tab of this.tabs) {
          tab.dataSet = [];
        }
        this.snackBar.open('БД была грохнула', 'Закрыть', {
          duration: 3000,
        });
      },
      error: (err) => console.log(err),
    });
  }

  createDb() {
    this.http$.post(`${BACK_URL}/createDb`, {}).subscribe({
      complete: () => {
        this.snackBar.open('БД была создана', 'Закрыть', {
          duration: 3000,
        });
        this.getTablesData();
      },
      error: (err) => console.log(err),
    });
  }

  fillAllTables() {
    this.http$.post(`${BACK_URL}/fillTables`, {}).subscribe({
      complete: () => {
        this.snackBar.open('Все таблицы были заполнены данными', 'Закрыть', {
          duration: 3000,
        });
        this.getTablesData();
      },
      error: (err) => console.log(err),
    });
  }

  truncCurrentTable() {
    const currentTab = this.tabs[this.currentTabIndex];
    this.http$
      .post(`${BACK_URL}/truncTable`, {
        tableName: currentTab.tableName.toLowerCase(),
      })
      .subscribe({
        complete: () => {
          this.snackBar.open('Таблица была очищена', 'Закрыть', {
            duration: 3000,
          });
          const currentTableView =
            this.tableViews.toArray()[this.currentTabIndex];
          currentTableView.table.renderRows();
          currentTab.dataSet = [];
        },
        error: (err) => console.log(err),
      });
  }
}
