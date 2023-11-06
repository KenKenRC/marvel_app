import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from './models/loginRequest';
import { LoginResponse } from './models/loginResponse';
import { PersonajesResponse } from './models/personajesResponse';
import { BitacoraResponse } from './models/bitacoraResponse';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host = 'http://localhost:8080/api';

  currentUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  public getCharacters(): Observable<PersonajesResponse> {
    return this.http.get<PersonajesResponse>(this.host + '/characters');
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.host + '/login', loginRequest).pipe(
      tap((userData: LoginResponse) => {
        if(userData.codigo=="0"){
          this.currentUser.next(true);
        }
      })
    )
  }

  public getBitacora(): Observable<BitacoraResponse[]> {
    return this.http.get<BitacoraResponse[]>(this.host + '/bitacora');
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUser.asObservable();
  }
}
