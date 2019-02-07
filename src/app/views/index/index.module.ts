import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IndexViewComponent } from './index.component';
import { HeaderComponent } from 'src/app/components/headers/header.component';

import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatExpansionModule,
  MatIconModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatToolbarModule,
  MatTableModule,
  MatCardModule,
  MatPaginatorModule,
  MatChipsModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatStepperModule,
  MatDividerModule
} from '@angular/material';
import { ChatsViewComponent } from '../chats/chats.component';
import { ChatsModule } from '../chats/chats.module';
import { ChatModule } from '../chat/chat.module';


@NgModule({
  declarations: [
    IndexViewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,

    ChatModule,
    ChatsModule,

    // *************************************
    // * Mat                               *
    // *************************************
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatStepperModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [
    IndexViewComponent,
    HeaderComponent
  ]
})
export class IndexModule { }
