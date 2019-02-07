import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  MatDividerModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatTabsModule,
  MatCheckboxModule,
  MatMenuModule
} from '@angular/material';

import { ChatViewComponent } from './chat.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // BrowserAnimationsModule,
    FormsModule,

    // *************************************
    // * Mat                               *
    // *************************************
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    ScrollingModule
  ],
  exports: [
    ChatViewComponent
  ],
  providers: [],
  bootstrap: [
    ChatViewComponent
  ]
})
export class ChatModule { }
