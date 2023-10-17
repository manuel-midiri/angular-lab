import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'samples', 
    loadChildren: () => import('./modules/samples/samples.module').then(m => m.SamplesModule)
  },
  {
    path: 'tests', 
    loadChildren: () => import('./modules/tests/tests.module').then(m => m.TestsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
