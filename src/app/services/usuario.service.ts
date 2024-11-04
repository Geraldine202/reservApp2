import { Injectable } from '@angular/core';
//se agregaba el import de Storage: storage-angular
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //y en el constructor se crea una variable del módulo:
  constructor(private storage: Storage) {
    this.init();
  }

  async init(){
    await this.storage.create();
    let usuarios = [{
      "rut": "11111111-1",
      "nombre": "administrador",
      "fecha_nacimiento": "1980-01-01",
      "genero": "Masculino",
      "correo": "admin@duocuc.cl",
      "contrasena": "Admin123.",
      "valida_contrasena": "Admin123.",
      "tiene_equipo": "no",
      "nombre_equipo": "",
      "tipo_usuario": "Administrador"
    },{
      "rut": "17543330-9",
      "nombre": "alan",
      "fecha_nacimiento": "1990-03-24",
      "genero": "Masculino",
      "correo": "alan.gajardo@duocuc.cl",
      "contrasena": "Alanalan123.",
      "valida_contrasena": "Alanalan123.",
      "tiene_equipo": "si",
      "nombre_equipo": "los profes",
      "tipo_usuario": "Alumno"
    },{
      "rut": "18671637-k",
      "nombre": "luisa",
      "fecha_nacimiento": "1993-13-10",
      "genero": "Femenino",
      "correo": "luisa.marin@duocuc.cl",
      "contrasena": "Luisaluisa123.",
      "valida_contrasena": "Luisaluisa123.",
      "tiene_equipo": "no",
      "nombre_equipo": "",
      "tipo_usuario": "Alumno"
    }];
    for(let u of usuarios){
      await this.createUsuario(u);
    }
  }

  //aquí vamos a crear toda nuestra lógica de programación
  //DAO:
  public async createUsuario(usuario:any): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    if(usuarios.find(usu=>usu.rut==usuario.rut)!=undefined){
      return false;
    }
    usuarios.push(usuario);
    await this.storage.set("usuarios",usuarios);
    return true;
  }

  public async getUsuario(rut:string): Promise<any>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    return usuarios.find(usu=>usu.rut==rut);
  }

  public async getUsuarios(): Promise<any[]>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    return usuarios;
  }

  public async updateUsuario(rut:string, nuevoUsuario:any): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    let indice: number = usuarios.findIndex(usu=>usu.rut==rut);
    if(indice==-1){
      return false;
    }
    usuarios[indice] = nuevoUsuario;
    await this.storage.set("usuarios",usuarios);
    return true;
  }

  public async deleteUsuario(rut:string): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    let indice: number = usuarios.findIndex(usu=>usu.rut==rut);
    if(indice==-1){
      return false;
    }
    usuarios.splice(indice,1);
    await this.storage.set("usuarios",usuarios);
    return true;
  }

  public async login(correo: string, contrasena: string): Promise<any>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    const usu =  usuarios.find(elemento=> elemento.correo==correo && elemento.contrasena==contrasena);
    if(usu){
      //localStorage almacena la información SI o SI como String:
      localStorage.setItem("usuario", JSON.stringify(usu) );
      return true;
    }
    return false;
  }

  public async recuperarUsuario(correo:string): Promise<any>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    return usuarios.find(elemento=> elemento.correo == correo);
  }

}
