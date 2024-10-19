import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Corrección aquí
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-anomalias',
  templateUrl: './anomalias.page.html',
  styleUrls: ['./anomalias.page.scss'],
})
export class AnomaliasPage implements OnInit, OnDestroy {
  anomalies: any[] = [];
  dailyAnomalies: any[] = [];
  monthlyAnomalies: any[] = [];
  yearlyAnomalies: any[] = [];
  anomaliesSubscription: Subscription | null = null;

  // Variables para almacenar gráficos
  dailyChart: any;
  monthlyChart: any;
  yearlyChart: any;

  constructor(private firestore: AngularFirestore) {} // Corrección aquí

  ngOnInit() {
    this.getAnomalies();
  }

  ngOnDestroy() {
    // Cancelar la suscripción cuando el componente se destruye
    if (this.anomaliesSubscription) {
      this.anomaliesSubscription.unsubscribe();
    }
    // Destruir gráficos cuando se salga de la vista
    this.destroyCharts();
  }

  getAnomalies() {
    const anomaliesCollection = this.firestore.collection('anomalias-bdd');
    this.anomaliesSubscription = anomaliesCollection.valueChanges().subscribe((data: any) => {
      this.anomalies = data;
      this.processAnomaliesByDate();
      this.createCharts();
    });
  }  

  processAnomaliesByDate() {
    // Agrupar anomalías por día, mes y año
    this.dailyAnomalies = this.groupByDate('day');
    this.monthlyAnomalies = this.groupByDate('month');
    this.yearlyAnomalies = this.groupByDate('year');
  }

  groupByDate(type: 'day' | 'month' | 'year') {
    return this.anomalies.reduce((acc, anomaly) => {
      // Asumiendo que anomaly.date está en el formato dd-mm-yyyy
      const dateParts = anomaly.date.split('-');
      const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`); // Convertir a yyyy-mm-dd
  
      // Validar si la fecha es válida
      if (isNaN(formattedDate.getTime())) {
        console.error('Fecha inválida encontrada:', anomaly.date);
        return acc; // Saltar esta anomalía si la fecha no es válida
      }
  
      let key = '';
  
      if (type === 'day') {
        key = formattedDate.toISOString().split('T')[0]; // yyyy-mm-dd
      } else if (type === 'month') {
        key = `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}`; // yyyy-mm
      } else if (type === 'year') {
        key = `${formattedDate.getFullYear()}`; // yyyy
      }
  
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(anomaly);
      return acc;
    }, {});
  }  

  createCharts() {
    // Destruir gráficos anteriores antes de crear nuevos
    this.destroyCharts();

    // Gráfico de anomalías diarias
    this.dailyChart = new Chart('dailyChart', {
      type: 'bar',
      data: {
        labels: Object.keys(this.dailyAnomalies),
        datasets: [{
          label: 'Anomalías Diarias',
          data: Object.values(this.dailyAnomalies).map(a => a.length),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      }
    });

    // Gráfico de anomalías mensuales
    this.monthlyChart = new Chart('monthlyChart', {
      type: 'line',
      data: {
        labels: Object.keys(this.monthlyAnomalies),
        datasets: [{
          label: 'Anomalías Mensuales',
          data: Object.values(this.monthlyAnomalies).map(a => a.length),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }
    });

    // Gráfico de anomalías anuales
    this.yearlyChart = new Chart('yearlyChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.yearlyAnomalies),
        datasets: [{
          label: 'Anomalías Anuales',
          data: Object.values(this.yearlyAnomalies).map(a => a.length),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      }
    });
  }

  destroyCharts() {
    if (this.dailyChart) {
      this.dailyChart.destroy();
    }
    if (this.monthlyChart) {
      this.monthlyChart.destroy();
    }
    if (this.yearlyChart) {
      this.yearlyChart.destroy();
    }
  }
}
