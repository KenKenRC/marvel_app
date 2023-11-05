import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host = 'http://localhost:8080/api';

  constructor(private http:HttpClient) { 
  }

  public getCharacters(): Observable<any>{
    return this.http.get<any>(this.host+'/characters');
  }
}
