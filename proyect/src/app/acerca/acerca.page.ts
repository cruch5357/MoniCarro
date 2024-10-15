import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {

  isRotating: boolean[] = [false, false, false, false];

  constructor() { }

  ngOnInit() {
  }

  toggleRotation(index: number) {
    this.isRotating[index] = !this.isRotating[index];
  }

}
