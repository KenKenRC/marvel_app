import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from './models/loginRequest';
import { LoginResponse } from './models/loginResponse';
import { PersonajesResponse } from './models/personajesResponse';
import { BitacoraResponse } from './models/bitacoraResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host = 'http://localhost:8080/api';

  constructor(private http:HttpClient) { 
  }

  public getCharacters(): Observable<PersonajesResponse>{
    return this.http.get<PersonajesResponse>(this.host+'/characters');
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.host+'/login', loginRequest);
  }

  public getBitacora(): Observable<BitacoraResponse[]>{
    return this.http.get<BitacoraResponse[]>(this.host+'/bitacora');
  }
}
