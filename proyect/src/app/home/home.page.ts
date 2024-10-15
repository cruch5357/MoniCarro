import { Component } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  username!: string; 
  mail!: string;  
  

  private animation!: Animation;
  constructor(private aCtrl: AnimationController) { }
  
  ngOnInit() {
    this.loadUsername();
  }



  
  
  ngAfterViewInit() {
    // Configura la animación
    this.animation = this.aCtrl.create()
      .addElement(document.querySelector('.scanner-icon') as HTMLElement)
      .iterations(1)  // Solo se ejecutará una vez cada vez que se invoque
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'rotate(0)' },
        { offset: 0.4, transform: 'rotate(10deg)' },
        { offset: 0.8, transform: 'rotate(-10deg)' },
        { offset: 1, transform: 'rotate(0)' },
      ]);

    // Reproduce la animación automáticamente al cargar la vista
    this.animation.play();

    // Configura que la animación se repita cada 5 segundos (5000 ms)
    setInterval(() => {
      this.animation.play();
    }, 2500); // Cambia el tiempo según la frecuencia deseada
  }
  
  loadUsername() {
    const email = sessionStorage.getItem('loggedInUser'); // Obtener el email del sessionStorage
    if (email) {
      this.username = email.split('@')[0].toUpperCase(); // Extraer la parte antes del @
    }
  }

}
