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
  private host = 'http://localhost:8080';

  currentUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentToken: string = "";

  constructor(private http: HttpClient) {
  }

  createAuthorizationHeader(): HttpHeaders {
    var headers = new HttpHeaders().set('Authorization', this.currentToken); 
    console.log('Token: ' + this.currentToken);
    return headers;
  }

  public getCharacters(): Observable<PersonajesResponse> {
    let header = this.createAuthorizationHeader();
    const requestOptions = {  headers: header};   
    return this.http.get<PersonajesResponse>(this.host + '/api/characters', requestOptions);
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.host + '/login', loginRequest).pipe(
      tap((userData: LoginResponse) => {
        if(userData.codigo=="0"){
          this.currentUser.next(true);
          console.log(userData.token);
          this.currentToken = userData.token;
        }
      })
    )
  }

  public getBitacora(): Observable<BitacoraResponse[]> {
    let header = this.createAuthorizationHeader();
    const requestOptions = {  headers: header };   
    return this.http.get<BitacoraResponse[]>(this.host + '/api/bitacora',requestOptions);
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUser.asObservable();
  }
}
