import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.page.html',
  styleUrls: ['./analisis.page.scss'],
})
export class AnalisisPage implements OnInit {
  registros$: Observable<any[]> = of([]); 
  estaciones = ['Todas las estaciones', 'Estación 1', 'Estación 2', 'Estación 3', 'Estación 4']; 
  estacionSeleccionada: string = 'Todas las estaciones'; 

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.obtenerRegistros(); 
  }

  obtenerRegistros() {
    this.registros$ = this.firestore.collection('monitoreo-bdd').valueChanges().pipe(
      map((registros: any[]) =>
        registros
          .filter((registro: any) => this.estacionSeleccionada === 'Todas las estaciones' || registro.estacion === this.estacionSeleccionada)
          .map((registro: any) => {
            let fecha: Date;
  
            if (typeof registro.fecha === 'string') {
              fecha = new Date(registro.fecha); 
            } else if (registro.fecha.toDate) {
              fecha = registro.fecha.toDate(); 
            } else {
              fecha = new Date(); 
            }
  
            const diaMes = this.formatearDiaMes(fecha);
            const fechaCompleta = this.formatearFechaCompleta(registro.fecha); 
            return {
              ...registro,
              diaMes,
              fechaCompleta
            };
          })
      )
    );
  }

  formatearDiaMes(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    return `${dia}/${mes}`;
  }

  formatearFechaCompleta(fecha: any): string {
    if (fecha instanceof Date) {
      fecha = fecha.toISOString();
    }

    if (typeof fecha === 'string' && fecha.includes('T')) {
      const [fechaStr, horaStr] = fecha.split('T');
      return `${fechaStr} ; ${horaStr}`; 
    }

    return fecha;
  }

  onEstacionSeleccionada(estacion: string) {
    this.estacionSeleccionada = estacion;
    this.obtenerRegistros();
  }
}
