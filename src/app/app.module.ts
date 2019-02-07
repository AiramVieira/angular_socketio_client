import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Events, AuthService, ChatService, SettingsService, StorageService } from './services/services';
import { IndexModule } from './views/index/index.module';
import { LoginModule } from './views/login/login.module';
import { ChatsModule } from './views/chats/chats.module';
import { ChatModule } from './views/chat/chat.module';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    ChatModule,
    ChatsModule,
    IndexModule,
    LoginModule
  ],
  providers: [
    Events,
    AuthService,
    ChatService,
    MessageService,
    SettingsService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
