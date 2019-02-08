import { Injectable, NgModule } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';

@Injectable()
export class MessageSocket extends Socket {

  public messagesAPI = `https://python-socketio-example.herokuapp.com`;

  constructor(private userId: string, private ticket: string) {
    super({
      url: `https://python-socketio-example.herokuapp.com/messages?user_id=${userId}&ticket=${ticket}`, options: {
        transports: ['websocket']
      }
    });
    console.log(`https://python-socketio-example.herokuapp.com/messages?user_id=${userId}&ticket=${ticket}`);
  }

}
