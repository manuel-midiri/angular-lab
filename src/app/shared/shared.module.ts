import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';



@NgModule({
  declarations: [
    TableComponent,
    DialogDeleteComponent,
    DialogCreateComponent,
    DialogEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ], 
  exports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    TableComponent,
    MatDialogModule
  ]
})
export class SharedModule { }
