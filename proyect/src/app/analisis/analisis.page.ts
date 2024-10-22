import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js'; // Importa los componentes de Chart.js

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.page.html',
  styleUrls: ['./analisis.page.scss'],
})
export class AnalisisPage implements OnInit {
  registros$: Observable<any[]> = of([]); 
  estaciones = ['Todas las estaciones', 'Estación 1', 'Estación 2', 'Estación 3', 'Estación 4']; 
  estacionSeleccionada: string = 'Todas las estaciones';
  public chart: any;
  datosGrafico: any[] = []; // Almacenar los datos para el gráfico

  constructor(private firestore: AngularFirestore) {
    Chart.register(...registerables); // Registra todos los componentes de Chart.js
  }

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
            const fechaCompleta = this.formatearFechaCompleta(fecha); 
            return {
              ...registro,
              diaMes,
              fechaCompleta,
              fechaObj: fecha // Agregamos el objeto de fecha para facilitar la ordenación
            };
          })
          .sort((a, b) => a.fechaObj.getTime() - b.fechaObj.getTime()) // Ordenar por fecha
      )
    );

    // Suscribirse a los registros para crear el gráfico cuando los datos estén disponibles
    this.registros$.subscribe(registros => {
      this.datosGrafico = registros;
      this.crearGrafico(); // Llama a la función para crear el gráfico
    });
  }

  formatearDiaMes(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    return `${dia}/${mes}`;
  }

  formatearFechaCompleta(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  onEstacionSeleccionada(estacion: string) {
    this.estacionSeleccionada = estacion;
    this.obtenerRegistros();
  }

  crearGrafico() {
    const canvas = document.getElementById('graficoPasajeros') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d'); 

    if (ctx) {
      if (this.chart) {
        this.chart.destroy(); 
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.datosGrafico.map(dato => dato.fechaCompleta),  
          datasets: [{
            label: 'Cantidad de Pasajeros',
            data: this.datosGrafico.map(dato => dato.pasajeros),  
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Fechas'
              }
            },
            y: {
              type: 'linear',  
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad de Pasajeros'
              }
            }
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto 2D del canvas.');
    }
  }
}
