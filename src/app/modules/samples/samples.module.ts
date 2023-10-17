import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamplesRoutingModule } from './samples-routing.module';
import { SampleListComponent } from './sample-list/sample-list.component';
import { DetailSampleComponent } from './detail-sample/detail-sample.component';


@NgModule({
  declarations: [
    SampleListComponent,
    DetailSampleComponent
  ],
  imports: [
    CommonModule,
    SamplesRoutingModule
  ]
})
export class SamplesModule { }
