import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de incluir ReactiveFormsModule
import { RegistroDiarioPage } from './registro-diario.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Para soportar formularios reactivos
    IonicModule,  // Importa el módulo de Ionic aquí también
    RouterModule.forChild([{ path: '', component: RegistroDiarioPage }])
  ],
  declarations: [RegistroDiarioPage]
})
export class RegistroDiarioPageModule {}
