import { Component, OnInit } from '@angular/core';

//lo primerp es agregar un import:
import * as L from 'leaflet';
import * as G from 'leaflet-control-geocoder';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  //vamos a crear variable(s) para controlar el mapa:
  private map: L.Map | undefined;
  private geocoder: G.Geocoder | undefined;
  latitud: number = 0;
  longitud: number = 0;
  direccion: string = "";
  distancia_metros: number = 0;
  tiempo_segundos: number = 0;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap(){
    //Aca cargamos e inicializamos el mapa
    this.map = L.map("map_html").locate({setView:true, maxZoom:16});
    //this.map=L.map("map_html").setView([-33.5983622903235, -70.5784973965446],16);

    //Plantilla para que se vea el mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    //Vamos a agregar un buscador de direcciones en el mapa:
    this.geocoder = G.geocoder({
      placeholder: "Ingrese dirección a buscar",
      errorMessage: "Direccion no encontrada"
    }).addTo(this.map);
    this.map.on('locationfound', (e)=>{
      console.log(e.latlng.lat);
      console.log(e.latlng.lng); //poner en numeros de abajo,primero guardar en variables (ubicacion actual)
    });

    //Vamos a realizar una acción con el buscador,cuando ocurra algo con el buscador
    this.geocoder.on('markgeocode', (e)=>{
      this.latitud = e.geocode.properties['lat'];
      this.longitud= e.geocode.properties['lon'];
      this.direccion = e.geocode.properties['display_name'];

      if(this.map){
        L.Routing.control({
          waypoints: [L.latLng(-33.5983622903235, -70.5784973965446),L.latLng(this.latitud,this.longitud)],
          fitSelectedRoutes: true
        }).on('routesfound', (e)=>{
          this.distancia_metros = e.routes[0].summary.totalDistance;
          this.tiempo_segundos = e.routes[0].summary.totalTime;
        }).addTo(this.map);
      }


    });
  }

}
