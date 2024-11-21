import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('Pagina Registro', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    //aqui dentro le entrego todo lo que necesite como modulos:
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot(),IonicStorageModule.forRoot()]
    }).compileComponents();


    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Verificar si la página registro se abre', () => {
    expect(component).toBeTruthy();
  });

  it ('2.1 Validar nombre incorrecto al estar vacio',()=>{
    const nombreControl = component.persona.get('nombre');
    nombreControl?.setValue("");
    expect(nombreControl?.valid).toBeFalse();
    expect(nombreControl?.hasError('required')).toBeTrue();
  });

  it('2.2 Validar el formato del nombre', ()=>{
    const nombreControl = component.persona.get('nombre');
    nombreControl?.setValue("f");
    expect(nombreControl?.valid).toBeFalse();
    expect(nombreControl?.hasError('pattern')).toBeTrue();
  });
  it('2.3 Validar un nombre correcto', ()=>{
    const nombreControl = component.persona.get('nombre');
    nombreControl?.setValue("Gareca");
    expect(nombreControl?.hasError('required')).toBeFalse();
    expect(nombreControl?.hasError('pattern')).toBeFalse();
    expect(nombreControl?.valid).toBeTrue();
  });
  it('3.1 Botón registrar deshabilitado', ()=>{
    component.persona.setValue({
      "rut": "",
      "nombre": "",
      "fecha_nacimiento": "",
      "genero": "",
      "correo": "",
      "contrasena": "",
      "valida_contrasena": "",
      "tiene_equipo": "",
      "nombre_equipo": "",
      "tipo_usuario": ""
    });
    const botonRegistrar = fixture.nativeElement.querySelector('ion-button[type="submit"]');
    expect(botonRegistrar.disabled).toBeTrue();
  });

  it('3.2 Botón registrar habilitado', ()=>{
    component.persona.setValue({
      "rut": "20792608-6",
      "nombre": "administrador",
      "fecha_nacimiento": "01-01-1980",
      "genero": "Masculino",
      "correo": "admin@duocuc.cl",
      "contrasena": "Admin123.",
      "valida_contrasena": "Admin123.",
      "tiene_equipo": "no",
      "nombre_equipo": "",
      "tipo_usuario": "Administrador"
    });
    const botonRegistrar = fixture.nativeElement.querySelector('ion-button[type="submit"]');
    expect(botonRegistrar.disabled).toBeFalse();
  });

  it('4. Formulario valido',()=>{
    component.persona.setValue({
      "rut": "20792608-6",
      "nombre": "administrador",
      "fecha_nacimiento": "01-01-1980",
      "genero": "Masculino",
      "correo": "admin@duocuc.cl",
      "contrasena": "Admin123.",
      "valida_contrasena": "Admin123.",
      "tiene_equipo": "no",
      "nombre_equipo": "",
      "tipo_usuario": "Administrador"
    });
    expect(component.persona.valid).toBeTrue();
  });
});
