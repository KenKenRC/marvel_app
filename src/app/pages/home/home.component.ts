import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { PersonajesResponse } from '../../service/models/personajesResponse';
import { Personaje } from '../../service/models/personaje';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  personajes?: PersonajesResponse;
  mostrarLista: boolean = false;
  listaPersonajes: Personaje[] = [];
  selectedPersonaje: any = {};

  constructor(private api: ApiService){ }

  ngOnInit(): void{
    this.obtenerPersonajes();
  }

  obtenerPersonajes(){
    this.api.getCharacters().subscribe({
      next: (data: PersonajesResponse) => {
          this.personajes = data;
          console.log(this.personajes);
          if(this.personajes.codigo == "0"){
            this.listaPersonajes = this.personajes.lstPersonajes;
            this.mostrarLista = true;
          }else{
            alert('Ocurrió un error al consultar characters');
          }
          console.log(this.personajes.codigo);
      },
      error: (errorData) =>{
          console.error(errorData);
      }
    });
  }

  seleccionarPersonaje(item: any){
    this.selectedPersonaje = item;
  }

}
