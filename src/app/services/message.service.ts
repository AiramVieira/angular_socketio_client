import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Subject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { MessageSocket } from './message.socket';
import { AuthService } from './auth.service';
import { Events } from './events.service';
import { Message } from '../models/Message';

@Injectable()
export class MessageService {

  public static socket: MessageSocket;

  public api = `https://ws-comunicacao.herokuapp.com`;
  public messagesAPI = `https://python-socketio-example.herokuapp.com`;

  constructor(private httpClient: HttpClient,
    private storageService: StorageService,
    private authService: AuthService,
    private events: Events) {
  }

  public getMessagesByChatId(chatId: number, limit: number = 20, beforeId: number = 0): Observable<any> {
    const url = `${this.api}/services/chats/${chatId}/messages?limit=${limit}&before_id=${beforeId}`;
    const headers: any = this.httpHeadersWithBearerAuthorization();

    return this.httpClient.get(url, headers);
  }

  public updateMessageSetReceived(messageId: number, contactId: number): Observable<any> {
    const url = `${this.messagesAPI}/services/messages/${messageId}/received/${contactId}`;
    const headers: any = this.httpHeadersWithBearerAuthorization();

    return this.httpClient.get(url, headers);
  }

  public updateMessageSetSeen(messageId: number, contactId: number): Observable<any> {
    const url = `${this.messagesAPI}/services/messages/${messageId}/seen/${contactId}`;
    const headers: any = this.httpHeadersWithBearerAuthorization();

    return this.httpClient.get(url, headers);
  }

  public connect() {
    this.authService.ticket().subscribe((response: any) => {
      if (response.status === 'success') {
        MessageService.socket = new MessageSocket(this.storageService.get('user').id, response.ticket);

        MessageService.socket.on(`connect`, (c) => {
          console.log(c);
        });

        MessageService.socket.on(`disconnect`, () => {
          console.log('disconnect');
        });

        MessageService.socket.on(`connect::success`, () => {
          console.log('connect::success');
        });
        MessageService.socket.on(`connect::failed`, () => {
          console.log('connect::failed');
        });

        MessageService.socket.on(`message::created`, (message: any) => {
          message = new Message(message);
          console.log(`message:${message.chat.id}:created`);
          this.events.next(`message::created`, message);
          this.events.next(`message:${message.chat.id}:created`, message);
        });

        MessageService.socket.on(`message::updated`, (message: any) => {
          message = new Message(message);
          console.log(`message:${message.chat.id}:updated`);
          this.events.next(`message::updated`, message);
          this.events.next(`message:${message.chat.id}:updated`, message);
        });
      }
    });
  }

  public emit(eventName: string, data: any) {
    return new Promise<void>((resolve, reject) => {
      MessageService.socket.ioSocket.emit(eventName, data);
      resolve();
    });
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
