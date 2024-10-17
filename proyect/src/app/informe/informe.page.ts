import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.page.html',
  styleUrls: ['./informe.page.scss'],
})
export class InformePage {
  constructor(private alertController: AlertController) {}

  async downloadReport() {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`; // Formato dd-mm-aaaa

    const alert = await this.alertController.create({
      header: 'Descarga en Progreso',
      message: `InformeMoniCarro_${formattedDate}.pdf`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
