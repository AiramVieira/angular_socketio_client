import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

  public api = `https://ws-comunicacao.herokuapp.com/services`;
  public messagesAPI = `https://python-socketio-example.herokuapp.com/services`;

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  public token(credentials: any): Observable<any> {
    const url = `${this.api}/auth/token`;
    const headers = this.httpHeaders();

    return this.httpClient.post(url, JSON.stringify(credentials), headers);
  }

  public ticket(): Observable<any> {
    const url = `${this.messagesAPI}/auth/ticket`;
    const headers = this.httpHeadersWithBearerAuthorization();

    return this.httpClient.get(url, headers);
  }

  private httpHeaders(): any {
    return {
      'headers': new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  private httpHeadersWithBearerAuthorization(): any {
    return {
      'headers': new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storageService.get(`token`)}`
      })
    };
  }


}
