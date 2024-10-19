import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnomaliesService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener todas las anomalías
  getAnomalies(): Observable<any[]> {
    return this.firestore.collection('anomalias-bdd').valueChanges();
  }
}
