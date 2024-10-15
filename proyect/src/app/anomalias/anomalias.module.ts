import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnomaliasPageRoutingModule } from './anomalias-routing.module';

import { AnomaliasPage } from './anomalias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnomaliasPageRoutingModule
  ],
  declarations: [AnomaliasPage]
})
export class AnomaliasPageModule {}
