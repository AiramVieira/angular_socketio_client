import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/services';
import { ChatSummary } from 'src/app/models/ChatSummary';
import { Contact } from 'src/app/models/Contact';
import { Chat } from 'src/app/models/Chat';
import { Organization } from 'src/app/models/Organization';

@Component({
  selector: 'app-chats-view',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  exportAs: 'ChatsViewComponent'
})
export class ChatsViewComponent implements OnInit {

  public currentUser: any;

  public chats: ChatSummary[] = new Array<ChatSummary>();

  public selectedChatId: number;

  strip(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  constructor(private chatService: ChatService, private storageService: StorageService) {
    this.currentUser = storageService.get('user');
  }

  public getFilteredChatsByContactId(contactId: number): void {
    const that = this;
    this.chatService.getFilteredChatsByContactId(contactId).subscribe((response: any) => {
      if (response.status === 'success') {
        for (const record of response.records) {
          if (record != null) {
            const chat = new ChatSummary.Builder()
              .withServerId(record.messageServerId)
              .withDeviceId(record.messageDeviceId)
              .withContent(that.strip(record.messageContent))
              .withStatus(record.messageStatus)
              .withContact(new Contact.Builder(record.messageContactId)
                .withDescription(record.messageContactDescription)
                .withShortDescription(record.messageContactShortDescription)
                .withType(record.messageContactType)
                .build()
              )
              .withChat(new Chat.Builder(record.messageChatId)
                .withSubject(record.messageChatSubject || '(Sem Assunto)')
                .withContactFrom(new Contact.Builder(record.chatContactFromId)
                  .withDescription(record.chatContactFromDescription)
                  .withShortDescription(record.chatContactFromShortDescription)
                  .withType(record.chatContactFromType).build()
                )
                .withContactTo(new Contact.Builder(record.chatContactToId)
                  .withDescription(record.chatContactToDescription)
                  .withShortDescription(record.chatContactToShortDescription)
                  .withType(record.chatContactToType).build()
                )
                .withOrganizationFrom(new Organization.Builder(null)
                  .withName(record.organizationFromName)
                )
                .withOrganizationTo(new Organization.Builder(null)
                  .withName(record.organizationToName)
                )
                .build()
              )
              .withOrganizationFrom(record.organizationFromName || '')
              .withOrganizationTo(record.organizationToName || '')
              .withCreatedAt(record.messageCreatedAt)
              .withUpdatedAt(record.messageUpdatedAt)
              .build();

            chat.nonReadMessages = record.nonReadMessages;

            that.chats.push(chat);
          }
        }
      }
    });
  }

  public select(chatId: number): void {
    this.selectedChatId = chatId;
  }

  public isSelected(chatId: number): boolean {
    return this.selectedChatId === chatId;
  }

  public ngOnInit() {
    this.getFilteredChatsByContactId(this.currentUser.contact.id);
  }

}
