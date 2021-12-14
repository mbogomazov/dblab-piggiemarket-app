import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import DisplayedColumn from '../../../../model/columns/displayedcolumns.model';


@Component({
  selector: 'dblab-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrls: ['./add-data-dialog.component.css']
})
export class AddDataDialogComponent{

  newRowData: {[key: string]: string | number } = {};
  columns!: DisplayedColumn[];

  constructor(
    public dialogRef: MatDialogRef<AddDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DisplayedColumn[],
  ) {
    this.columns = this.data.slice(1, -1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
