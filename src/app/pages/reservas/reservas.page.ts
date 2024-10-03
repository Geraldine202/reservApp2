import { Component, OnInit } from '@angular/core';

//lo primero es agregar un import:
import * as L from 'leaflet';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  //vamos a crear variable(s) para controlar el mapa:
  private map: L.Map | undefined;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap(){
    this.map = L.map("map_html").locate({setView:true, maxZoom:16});
    //this.map = L.map("map_html").setView([-33.608552227594245, -70.58039819211703],16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

}
