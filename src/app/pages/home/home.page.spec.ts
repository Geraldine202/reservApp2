import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { RouterTestingModule} from '@angular/router/testing';

describe('Página Home', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let usuarioPrueba ={
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
  }
  //aqui dentro del beforeEach deben preprarar todo lo necesario de la pagina
  beforeEach(async () => {
    const localStoragePrueba = {
      getItem: jasmine.createSpy('getItem').and.callFake((key: string)=>{
        if (key==='usuario'){
          return JSON.stringify(usuarioPrueba);
        }
        return null;
      }),
      setItem: jasmine.createSpy('setItem'),
      removeItem: jasmine.createSpy('removeItem')
    };
    Object.defineProperty(window, 'localStorage', {value: localStoragePrueba});

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(),RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it: es una prueba unitaria
  it('1. Verificar si a pagina se abre', () => {
    expect(component).toBeTruthy();
  });

  it('2. Verificar el nombre del usuario',()=>{
    expect(component.usuario.nombre).toEqual("administrador");
  });

  it('3. Validar el usuario completo',()=>{
    expect(localStorage.getItem).toHaveBeenCalledWith('usuario');
    expect(component.usuario).toEqual(usuarioPrueba);
  });
});
