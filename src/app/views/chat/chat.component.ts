import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Renderer, AfterViewInit } from '@angular/core';
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
export class ChatViewComponent implements OnInit, AfterViewInit {

  public currentUser: any;

  @ViewChild('scrollContent') public scrollContent: ElementRef;

  @ViewChildren('messagesListContainer') messagesListContainer: QueryList<Message[]>;

  public messages: Array<Message> = new Array<Message>();

  public beforeId = -1;

  public content: string;

  // Message Attributes
  public chat: Chat = new Chat({ id: null, subject: '123' });

  constructor(private events: Events,
    private chatService: ChatService, public renderer: Renderer,
    private messageService: MessageService,
    private storageService: StorageService) {
    this.currentUser = storageService.get('user');

  }

  public refresh(): Promise<Message[]> {
    const that = this;
    return new Promise<Message[]>((resolve, reject) => {
      that.messages = this.messages.sort((a: Message, b: Message) => {
        return a.updatedAt < b.updatedAt ? -1 : a > b ? 1 : 0;
      });
      resolve(that.messages);
    });
  }

  public send(content: string = this.content, doUrlify: boolean = true, doBoldify: boolean = true): void {
    const that = this;

    this.content = '';

    if (typeof content !== 'undefined' && content != null && content !== '') {
      const message = new Message.Builder()
        .withChat(that.chat).withContact(that.currentUser.contact)
        .withStatus(0)
        .withType(0)
        .withCreatedAt(new Date()).withUpdatedAt(new Date())
        .withContent(content).build();

      that.onMessageCreated(message);
      that.messageService.emit(`message::created`, message).then(() => {
        this.refresh();
      });
    }
  }

  public getMessagesByChatId(chat: any = this.chat, limit: number = 20, beforeId = this.beforeId): Promise<any> {
    return new Promise((resolve, reject) => {
      const that = this;
      return that.messageService.getMessagesByChatId(chat.id, limit, beforeId).subscribe((response: any) => {
        if (response.status === 'success') {
          const records = response.records;

          if (records.length > 0) {
            records.forEach((record: any) => {
              that.messages.splice(0, 0, record);

              if (record.contact.id !== that.currentUser.contact.id && record.status < 3) {
                this.messageService.emit(`message::seen`, {
                  serverId: record.serverId, contact: this.currentUser.contact
                });
              }
            });
            that.beforeId = records[records.length - 1].serverId;

            that.scrollToBottom();
          }
        } else if (response.status === 'error') {
          // that.toast.showSimpleSnackBar(response.message);
        }
      });
    });
  }

  public onMessageCreated(message: Message): void {
    const that = this;

    const index = that.messages.indexOf(
      that.messages.filter((m) => {
        return `${message.chat.id}` === `${m.chat.id}`
          && `${message.contact.id}` === `${m.contact.id}`
          && new Date(message.createdAt).getTime() === new Date(m.createdAt).getTime();
      })[0]
    );
    if (index > -1) {
      this.messages[index] = message;
    } else {
      that.appendMessage(message).then(async () => {
        return that.refresh().then(() => {
          that.scrollToBottom();
        });
      });
    }
  }

  public onMessageUpdated(message: Message): void {
    const that = this;

    const index = that.messages.indexOf(
      that.messages.filter((m) => {
        return `${message.chat.id}` === `${m.chat.id}`
          && `${message.contact.id}` === `${m.contact.id}`
          && new Date(message.createdAt).getTime() === new Date(m.createdAt).getTime();
      })[0]
    );
    if (index > -1) {
      this.messages[index] = message;

      that.refresh().then(() => {
        that.scrollToBottom();
      });
    }
  }

  public appendMessage(message: Message): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.messages.push(message);
      resolve();
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
    try {
      setTimeout(() => {
        this.scrollContent.nativeElement.scrollTop = this.scrollContent.nativeElement.scrollHeight;
      }, 300);
    } catch (ex) { console.log(ex); }
  }

  public scrollToBottomAnimation(): void {
    const that = this;
    try {
      let scrollTop = that.scrollContent.nativeElement.scrollTop;
      const scrollHeight = that.scrollContent.nativeElement.scrollHeight;
      const timer = setInterval(() => {
        scrollTop += 6;
        that.scrollContent.nativeElement.scrollTop = scrollTop;
        if (scrollTop >= scrollHeight) { clearInterval(timer); }
      }, 2);
    } catch (err) { console.log(err); }
  }

  public onScrollTop(): void {
    const that = this;
    try {
      const scrollElement = this.scrollContent.nativeElement;
      scrollElement.onscroll = (() => {
        if (scrollElement.scrollTop === 0) { that.getMessagesByChatId(); }
      });
    } catch (ex) { }
  }

  public ngOnInit() {
    this.refresh();
    this.onScrollTop();

    this.messageService.connect();

    this.events.subscribe(`chats::selected`, (chat: any) => {
      this.chat = chat;
      this.beforeId = -1;
      this.messages = new Array<Message>();
      this.getMessagesByChatId();

      this.events.subscribe(`message:${this.chat.id}:created`, (message: any) => {
        this.messageService.emit(`message::seen`, {
          serverId: message.serverId, contact: this.currentUser.contact
        });
        this.onMessageCreated(message);
      });
      this.events.subscribe(`message:${this.chat.id}:updated`, (message: any) => {
        this.onMessageUpdated(message);
      });
    });
  }
  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.messagesListContainer.changes.subscribe(() => {
      // this.scrollToBottom();
    });
  }

}
