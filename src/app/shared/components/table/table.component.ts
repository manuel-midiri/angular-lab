import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { Sample } from 'src/app/models/general.models';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: any;
  @Input() displayedColumns: string[] = [];
  @Input() isAdmin: boolean = false;
  @Output() isDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() isEdit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, public dialog: MatDialog){}

  public viewDetails(element: Sample){
    console.log('viewDetails', element);
    this.router.navigate(['samples', element.id])
  }
  public editItem(element: Sample){
    console.log('editItem', element);
    this.openDialogEdit(element);
  }
  public deleteItem(element: Sample){
    console.log('deleteItem', element);
    this.openDialogDelete(element);
  }

  public openDialogDelete(element: Sample): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {name: element.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isDelete.emit(element.id);
      }
    });
  }

  public openDialogEdit(element: Sample): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      data: {name: element.name, description: element.description},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isEdit.emit({result, id: element.id});
      }
    });
  }

}
