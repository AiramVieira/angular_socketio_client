import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChatsViewComponent } from './chats.component';
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


@NgModule({
  declarations: [
    ChatsViewComponent
  ],
  imports: [
    BrowserModule,

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
  exports: [
    ChatsViewComponent
  ],
  providers: [],
  bootstrap: [
    ChatsViewComponent
  ]
})
export class ChatsModule { }
