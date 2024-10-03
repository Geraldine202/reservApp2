import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  persona = new FormGroup({
    rut: new FormControl('',[Validators.required,Validators.pattern("[0-9]{7,8}-[0-9kK]{1}")]),
    nombre: new FormControl('',[Validators.required,Validators.pattern("[A-Za-z ]{3,}")]),
    fecha_nacimiento: new FormControl('',[Validators.required]),
    genero: new FormControl('',[Validators.required]),
    correo: new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9.]+(@duocuc.cl)")]),
    contrasena: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[-!#$%&/()?¡_.])(?=.*[A-Za-z])(?=.*[a-z]).{8,}$")]),
    valida_contrasena: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[-!#$%&/()?¡_.])(?=.*[A-Za-z])(?=.*[a-z]).{8,}$")]),
    tiene_equipo: new FormControl('no',[Validators.required]),
    nombre_equipo: new FormControl('',[]),
    tipo_usuario: new FormControl('', [Validators.required])
  });
  usuarios:any[] = [];
  botonModificar: boolean = true;

  //el servicio nos permite trabajar la información:
  constructor(private usuarioService: UsuarioService) { 
    this.persona.get("rut")?.setValidators([Validators.required,Validators.pattern("[0-9]{7,8}-[0-9kK]{1}"),this.validarRut()]);
  }

  async ngOnInit() {
    this.usuarios = await this.usuarioService.getUsuarios();
  }

  validarEdad18(fecha_nacimiento: string){
    var edad = 0;
    if(fecha_nacimiento){
      const fecha_date = new Date(fecha_nacimiento);
      const timeDiff = Math.abs(Date.now() - fecha_date.getTime());
      edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    if(edad>=18){
      return true;
    }else{
      return false;
    }
  }

  validarRut():ValidatorFn{
    return () => {
      const rut = this.persona.controls.rut.value;
      const dv_validar = rut?.replace("-","").split("").splice(-1).reverse()[0];
      let rut_limpio = [];
      if(rut?.length==10){
        rut_limpio = rut?.replace("-","").split("").splice(0,8).reverse();
      }else{
        rut_limpio = rut?.replace("-","").split("").splice(0,7).reverse() || [];
      }
      let factor = 2;
      let total = 0;
      for(let num of rut_limpio){
        total = total + ((+num)*factor);
        factor = factor + 1;
        if(factor==8){
          factor = 2;
        }
      }
      var dv = (11-(total%11)).toString();
      if(+dv>=10){
        dv = "k";
      }
      if(dv_validar!=dv.toString()) return {isValid: false};
      return null;
    };
  }

  async registrar(){
    if( !this.validarEdad18(this.persona.controls.fecha_nacimiento.value || "") ){
      alert("ERROR! debe tener al menos 18 años para registrarse!");
      return;
    }

    if(this.persona.controls.contrasena.value != this.persona.controls.valida_contrasena.value){
      alert("ERROR! las contraseñas no coinciden!");
      return;
    }

    if( await this.usuarioService.createUsuario(this.persona.value) ){
      alert("USUARIO CREADO CON ÉXITO!");
      this.persona.reset();
      this.usuarios = await this.usuarioService.getUsuarios();
    }else{
      alert("ERROR! NO SE PUDO CREAR EL USUARIO!");
    }
  }

  async buscar(rut_buscar:string){
    this.persona.setValue(await this.usuarioService.getUsuario(rut_buscar) );
    this.botonModificar = false;
  }

  async modificar(){
    var rut_buscar: string = this.persona.controls.rut.value || "";
    if(await this.usuarioService.updateUsuario( rut_buscar , this.persona.value)){
      alert("USUARIO MODIFICADO CON ÉXITO!");
      this.botonModificar = true;
      this.persona.reset();
      this.usuarios = await this.usuarioService.getUsuarios();
    }else{
      alert("ERROR! USUARIO NO MODIFICADO!");
    }
  }

  async eliminar(rut_eliminar:string){
    if(await this.usuarioService.deleteUsuario(rut_eliminar) ){
      alert("USUARIO ELIMINADO CON ÉXITO!")
      this.usuarios = await this.usuarioService.getUsuarios();
    }else{
      alert("ERROR! USUARIO NO ELIMINADO!")
    }
  }

}
