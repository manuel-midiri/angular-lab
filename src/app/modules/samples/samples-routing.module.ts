import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleListComponent } from './sample-list/sample-list.component';
import { DetailSampleComponent } from './detail-sample/detail-sample.component';

const routes: Routes = [
  { path: '', component: SampleListComponent },
  { path: ':id', component: DetailSampleComponent },
  { path: 'edit/:id', component: DetailSampleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplesRoutingModule { }
