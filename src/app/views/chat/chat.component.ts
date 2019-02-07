import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/services';
import { ChatSummary } from 'src/app/models/ChatSummary';
import { Contact } from 'src/app/models/Contact';
import { Chat } from 'src/app/models/Chat';
import { Organization } from 'src/app/models/Organization';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  exportAs: 'ChatViewComponent'
})
export class ChatViewComponent implements OnInit {

  public currentUser: any;

  // Message Attributes
  public chat: Chat = new Chat({subject: '123'});

  constructor(private chatService: ChatService, private storageService: StorageService) {
    this.currentUser = storageService.get('user');
  }

  public ngOnInit() {
  }

}
