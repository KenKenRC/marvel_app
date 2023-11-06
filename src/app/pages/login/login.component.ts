import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { LoginRequest } from '../../service/models/loginRequest';
import { LoginResponse } from '../../service/models/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    usuario: ['',Validators.required],
    pass: ['', Validators.required]
  });

  response?: LoginResponse;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ApiService){ }

  ngOnInit(): void{
  }

  login(){
    if(this.loginForm.valid){
      this.service.login(this.loginForm.value as LoginRequest).subscribe({
       next:(data: LoginResponse) => {
          this.response = data;
          console.log(this.response);
          if(this.response.codigo == "0"){
            this.router.navigateByUrl('/home');
          }else{
            alert('Usuario y/o contraseña inválidos');
          }
       }, 
       error:(errorData) => {
          console.error(errorData);
          alert('Problemas con el servicio');
       }

      });
    }else{
      alert('Los datos no son válidos');
    }
    
  }

}
