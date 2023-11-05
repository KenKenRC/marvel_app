import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  response: any={};

  constructor(private api: ApiService){ }

  ngOnInit(): void{
    this.obtenerPersonajes();
  }

  obtenerPersonajes(){
    this.api.getCharacters().subscribe(data => {
      this.response = data;
      console.log(this.response);
    });
  }

}
