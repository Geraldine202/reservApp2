import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-consumo-api',
  templateUrl: './consumo-api.page.html',
  styleUrls: ['./consumo-api.page.scss'],
})
export class ConsumoApiPage implements OnInit {

  //variable para almacenar la informacion que consume la API
  datos: any = [];
  dolar: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.consumirDigimons();
    this.consumirApi();
  }

  //VAMOS A CREAR UN METODO QUE INVOQUE AL METODO GET DE LA API
  consumirApi(){
    this.api.getDatos().subscribe((data:any)=>{
      //console.log(data);
      //console.log(data.dolar);
      //console.log(data.dolar.valor);
      this.dolar = data.dolar.valor;
    });
  }

  consumirDigimons(){
    this.api.getDigimons().subscribe((data:any)=>{
      console.log(data.content);
      this.datos = data.content;
    });
  }
}
