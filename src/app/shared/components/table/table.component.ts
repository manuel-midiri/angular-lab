import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { Sample } from 'src/app/models/general.models';
import { SampleService } from '../../services/sample.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: any;
  @Input() displayedColumns: string[] = [];
  @Input() isAdmin: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private router: Router, public dialog: MatDialog, private sampleService: SampleService){}
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  public viewDetails(element: Sample){
    console.log('viewDetails', element);
    this.router.navigate(['samples', element.id])
  }
  public editItem(element: Sample){
    console.log('editItem', element);
    this.router.navigate(['samples', 'edit', element.id])
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
        this.sampleService.deleteSample(element.id).subscribe();
      }
      console.log('The dialog was closed', element.id);
    });
  }
}
