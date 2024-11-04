import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.page.html',
  styleUrls: ['./detalle-reserva.page.scss'],
})
export class DetalleReservaPage implements OnInit {

  id: string = "";
  viaje: any = {};
  private map: L.Map | undefined;
  usuario: any = {};

  constructor(private activatedRoute: ActivatedRoute, private viajeService: ViajeService, private navController: NavController) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") || "";
    this.viaje = await this.viajeService.getViaje(this.id);
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    this.initMap();
  }

  initMap(){
    try {
      setTimeout(() => {
        this.map = L.map("map_detalle").setView([this.viaje.latitud, this.viaje.longitud],16);
          
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
        
        L.Routing.control({
          waypoints: [L.latLng(-33.608552227594245, -70.58039819211703),
          L.latLng(this.viaje.latitud,this.viaje.longitud)],
          fitSelectedRoutes: true,
          show: false,
        }).addTo(this.map);
      }, 2000);
    } catch (error) {}
  }

  async tomar_viaje(){
    var pasajero = {
      "rut": this.usuario.rut,
      "nombre": this.usuario.nombre,
      "correo": this.usuario.correo
    }
    console.log(pasajero);
    if(await this.viajeService.modificar_viaje(this.id, pasajero)){
      alert("Viaje tomado con éxito!");
      this.navController.navigateRoot("/home/reservas");
    }else{
      alert("ERROR! ya eres pasajero!");
    }
  }

  existePasajero(){
    let pasajeros: any[] = this.viaje.pasajeros;
    return pasajeros.some(p => p.rut == this.usuario.rut);
  }

  async cancelar_viaje(){
    await this.viajeService.deleteViaje(this.id)
    alert("Viaje eliminado con éxito!");
    this.navController.navigateRoot("/home/reservas");
  }
}
