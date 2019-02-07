import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Subject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class ChatService {

  public api = `https://ws-comunicacao.herokuapp.com`;

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  public getFilteredChatsByContactId(contactId: any, filter: any = {}): Observable<any> {
    const url = `${this.api}/services/contacts/${contactId}/chat_summary`;
    const headers = this.httpHeadersWithBearerAuthorization();

    return this.httpClient.post(url, JSON.stringify(filter), headers);
  }

  public getChatById(id: number): Observable<any> {
    const url = `${this.api}/services/chats/${id}`;
    const headers = this.httpHeadersWithBearerAuthorization();

    return this.httpClient.post(url, headers);
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
