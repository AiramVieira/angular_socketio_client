import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService, Events } from 'src/app/services/services';
import { ChatSummary } from 'src/app/models/ChatSummary';
import { Contact } from 'src/app/models/Contact';
import { Chat } from 'src/app/models/Chat';
import { Organization } from 'src/app/models/Organization';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  exportAs: 'ChatViewComponent'
})
export class ChatViewComponent implements OnInit {

  public currentUser: any;

  @ViewChild('scrollContent') public scrollContent: ElementRef;

  public messages: Array<Message> = new Array<Message>();

  public beforeId = -1;


  // Message Attributes
  public chat: Chat = new Chat({ id: null, subject: '123' });

  constructor(private events: Events,
    private chatService: ChatService,
    private messageService: MessageService,
    private storageService: StorageService) {
    this.currentUser = storageService.get('user');
  }

  getMessagesByChatId(chat: any = this.chat, limit: number = 20, beforeId = this.beforeId): Promise<any> {
    return new Promise((resolve, reject) => {
      const that = this;
      return that.messageService.getMessagesByChatId(chat.id, limit, beforeId).subscribe((response: any) => {
        if (response.status === 'success') {
          const records = response.records;

          if (records.length > 0) {
            // adiciona mensagens na primeira posição do array, 
            // para listagem inversa.
            records.forEach((record: any) => {
              that.messages.splice(0, 0, record);

              if (record.contact.id !== that.currentUser.contact.id && record.status <= 2) {
                // that.wsMessage.setRead(record.serverId, that.user.contact.id).subscribe();
              }
            });

            // Atualiza o ID da mensagem mais antiga para utilizar na próxima busca.
            that.beforeId = records[records.length - 1].serverId;
          }
        } else if (response.status === 'error') {
          // that.toast.showSimpleSnackBar(response.message);
        }
      });
    });
  }

  public shouldPlaceTimestampBubble(
    lastIndex: number, currentIndex: number, lastMessage: any, currentMessage: any): boolean {
    const hasLastMessage = (typeof lastMessage !== 'undefined' && lastMessage !== null);
    const lastMessageIsOK = hasLastMessage ? (lastMessage.createdAt && lastMessage.createdAt.getDate) : false;
    const currentMessageIsOK = (currentMessage.createdAt && currentMessage.createdAt.getDate);
    const hasDateDifference = (hasLastMessage && lastMessageIsOK && currentMessageIsOK)
      ? currentMessage.createdAt.getDate() !== lastMessage.createdAt.getDate()
      : false;
    return !hasLastMessage || hasDateDifference;
  }

  /* ***************************************************************************************** **
     * Scroll Events & Functions.
     *
     * ***************************************************************************************** */
  public scrollToBottom(): void {
    const that = this;
    setTimeout(() => {
      try {
        that.scrollContent.nativeElement.scrollTop = that.scrollContent.nativeElement.scrollHeight;
      } catch (err) { console.log(err); }
    }, 380);
  }

  public detectScroll(): void {
    try {
      const that = this;
      const scrollElement = this.scrollContent.nativeElement;

      scrollElement.onscroll = (() => {
        if (scrollElement.scrollTop === 0) {
          that.getMessagesByChatId();
        }
      });
    } catch (err) { }
  }

  public ngOnInit() {

    this.detectScroll();

    this.events.subscribe(`chats::selected`, (chat: any) => {
      this.chat = chat;
      this.beforeId = -1;
      this.messages = new Array<Message>();
      this.getMessagesByChatId();
    });

    this.events.subscribe(`message:${this.chat.id}:created`, (message: any) => {
      alert(message);
    });

    this.events.subscribe(`message:${this.chat.id}:updated`, (message: any) => {
      alert(message);
    });
  }

}
