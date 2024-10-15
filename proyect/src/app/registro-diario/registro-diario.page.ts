import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-registro-diario',
  templateUrl: './registro-diario.page.html',
  styleUrls: ['./registro-diario.page.scss'],
})
export class RegistroDiarioPage implements OnInit {
  registroForm!: FormGroup;  // Formulario para los datos de pasajeros y estación
  fechaForm!: FormGroup;     // Formulario separado para la fecha
  estaciones = ['Estación 1', 'Estación 2', 'Estación 3', 'Estación 4'];  // Lista de estaciones

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore, // Solo AngularFirestore
    private alertCtrl: AlertController // Inyecta el AlertController
  ) {}

  ngOnInit() {
    // Formulario para la fecha
    this.fechaForm = this.fb.group({
      fecha: ['', Validators.required],
    });

    // Formulario para el resto de los datos
    this.registroForm = this.fb.group({
      pasajeros: ['', [Validators.required, Validators.min(1)]],
      estacion: ['', Validators.required],
    });
  }
  
  async registrarPasajeros() {
    if (this.registroForm.valid && this.fechaForm.valid) {
      const { fecha } = this.fechaForm.value;
      const { pasajeros, estacion } = this.registroForm.value;
      const registro = { fecha, pasajeros, estacion };
      
      try {
        const docRef = await this.firestore.collection('monitoreo-bdd').add(registro);
        console.log('Registro exitoso, ID:', docRef.id);
        this.mostrarAlerta('Registro Exitoso', 'El registro se ha guardado correctamente.');
      } catch (error) {
        console.error('Error al registrar:', error);
        this.mostrarAlerta('Error', 'Hubo un problema al guardar el registro.');
      }
    }
  }

  // Función para mostrar la alerta
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
