import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  private animation!: Animation;
  constructor(private aCtrl: AnimationController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Configura la animación
    this.animation = this.aCtrl.create()
      .addElement(document.querySelector('.thanks') as HTMLElement)
      .iterations(Infinity)  // Si quieres que la animación se repita infinitamente
      .duration(4000)        // Incrementa la duración para que sea más suave
      .easing('ease-in-out')  // Añade una transición suave
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.25, transform: 'scale(1.05)', opacity: '0.8' },
        { offset: 0.5, transform: 'scale(0.95)', opacity: '1' },
        { offset: 0.75, transform: 'scale(1.05)', opacity: '0.8' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

    // Reproduce la animación automáticamente al cargar la vista
    this.animation.play();

    // Configura que la animación se repita cada 5 segundos (5000 ms)
    setInterval(() => {
      this.animation.play();
    }, 5000); // Cambia el tiempo según la frecuencia deseada
  }

}
