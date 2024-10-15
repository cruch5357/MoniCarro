import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDiarioPage } from './registro-diario.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroDiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroDiarioPageRoutingModule {}
