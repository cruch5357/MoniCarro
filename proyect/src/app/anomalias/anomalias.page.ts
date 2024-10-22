import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
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

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.getAnomalies();
  }

  ngOnDestroy() {
    if (this.anomaliesSubscription) {
      this.anomaliesSubscription.unsubscribe();
    }
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
    this.dailyAnomalies = this.groupByDate('day');
    this.monthlyAnomalies = this.groupByDate('month');
    this.yearlyAnomalies = this.groupByDate('year');
    
    // Ordenar las claves de las anomalías
    this.dailyAnomalies = this.sortAnomaliesByDate(this.dailyAnomalies, 'day');
    this.monthlyAnomalies = this.sortAnomaliesByDate(this.monthlyAnomalies, 'month');
    this.yearlyAnomalies = this.sortAnomaliesByDate(this.yearlyAnomalies, 'year');
  }

  sortAnomaliesByDate(anomaliesGroup: any, type: 'day' | 'month' | 'year') {
    const sortedKeys = Object.keys(anomaliesGroup).sort((a, b) => {
      let dateA, dateB;

      if (type === 'day') {
        const [yearA, monthA, dayA] = a.split('-').map(Number);
        const [yearB, monthB, dayB] = b.split('-').map(Number);
        dateA = new Date(yearA, monthA - 1, dayA);
        dateB = new Date(yearB, monthB - 1, dayB);
      } else if (type === 'month') {
        const [yearA, monthA] = a.split('-').map(Number);
        const [yearB, monthB] = b.split('-').map(Number);
        dateA = new Date(yearA, monthA - 1);
        dateB = new Date(yearB, monthB - 1);
      } else {
        dateA = new Date(Number(a), 0);
        dateB = new Date(Number(b), 0);
      }

      return dateA.getTime() - dateB.getTime(); // Orden ascendente
    });

    // Crear un nuevo objeto con las claves ordenadas
    const sortedAnomaliesGroup: any = {};
    sortedKeys.forEach(key => {
      sortedAnomaliesGroup[key] = anomaliesGroup[key];
    });

    return sortedAnomaliesGroup;
  }

  groupByDate(type: 'day' | 'month' | 'year') {
    return this.anomalies.reduce((acc, anomaly) => {
      const dateParts = anomaly.date.split('-');
      const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

      if (isNaN(formattedDate.getTime())) {
        console.error('Fecha inválida encontrada:', anomaly.date);
        return acc;
      }

      let key = '';

      if (type === 'day') {
        key = formattedDate.toISOString().split('T')[0];
      } else if (type === 'month') {
        key = `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}`;
      } else if (type === 'year') {
        key = `${formattedDate.getFullYear()}`;
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(anomaly);
      return acc;
    }, {});
  }

  createCharts() {
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
      },
      options: {
        scales: {
          x: {
            ticks: {
              callback: function(value: any, index: number, values: any) {
                // Convertimos value a número para que coincida con el tipo esperado
                const dateStr = this.getLabelForValue(value as number);
                const [year, month, day] = dateStr.split('-');
                return `${day}-${month}-${year}`; // Formato dd-mm-yyyy
              }
            }
          }
        }
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
