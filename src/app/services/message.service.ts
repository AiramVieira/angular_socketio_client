import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Subject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class MessageService {

  public api = `https://ws-comunicacao.herokuapp.com`;

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  public getMessagesByChatId(chatId: number, limit: number = 20, beforeId: number = 0): Observable<any> {
    const url = `${this.api}/services/chats/${chatId}/messages?limit=${limit}&before_id=${beforeId}`;
    const headers: any = this.httpHeadersWithBearerAuthorization();

    return this.httpClient.get(url, headers);
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
