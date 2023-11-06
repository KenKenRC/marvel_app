import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { BitacoraResponse } from 'src/app/service/models/bitacoraResponse';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent {

  response: BitacoraResponse[] = [];
  mostrarBitacora: boolean= false;

  constructor(private service: ApiService){}

  ngOnInit(): void{
    this.getBitacora();  
  }

  getBitacora(){
    this.service.getBitacora().subscribe({
      next:(data: BitacoraResponse[]) => {
        this.response = data;
        console.log(this.response);
        if(this.response.length>0){
          this.mostrarBitacora = true;
        }else{
          alert('No se encontraron registros en la bitácora');
        }
      },
      error:(errorData) => {
        console.error(errorData);
        alert('Problemas con el servicio');
     }

    });
  }
}
