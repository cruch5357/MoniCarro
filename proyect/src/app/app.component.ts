import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { MenuController } from '@ionic/angular';  // Importamos MenuController

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Registro Diario', url: '/registro-diario', icon: 'newspaper' },
    { title: 'Analiticas', url: '/analisis', icon: 'stats-chart' },
    // { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Acerca de', url: '/acerca', icon: 'people' },
    { title: 'Manual de Usuario', url: '/manual', icon: 'book' },
    { title: 'Ayuda', url: '/ayuda', icon: 'help' },
    // { title: 'Cerrar Sesión', icon: 'log-out' },
  ];

  public username: string = '';

  constructor(
    private router: Router, 
    private menuController: MenuController  // Inyectamos MenuController
  ) {
    this.initializeApp();  // Llamamos a la función para inicializar la app
  }

  ngOnInit() {
  }

  initializeApp() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkMenuVisibility(event.url);
      }
    });
  }

  checkMenuVisibility(url: string) {
    // Oculta el menú en las rutas
    if (url === '/login') {
      this.menuController.enable(false);
    } else {
      this.menuController.enable(true);
    }
  }
}
