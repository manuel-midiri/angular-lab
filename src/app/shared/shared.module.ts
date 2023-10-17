import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';




@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule
  ], 
  exports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class SharedModule { }
