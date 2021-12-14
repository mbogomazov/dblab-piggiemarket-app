import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import DisplayedColumn from '../../../../model/columns/displayedcolumns.model';

interface DialogData {
  column: DisplayedColumn,
  element: {[key: string]: string}
}

@Component({
  selector: 'dblab-change-data-dialog',
  templateUrl: './change-data-dialog.component.html',
  styleUrls: ['./change-data-dialog.component.css']
})
export class ChangeDataDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ChangeDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}