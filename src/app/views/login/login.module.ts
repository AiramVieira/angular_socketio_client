import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { LoginViewComponent } from './login.component';
import { AuthService } from 'src/app/services/services';

@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // BrowserAnimationsModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [AuthService],
  bootstrap: [LoginViewComponent]
})
export class LoginModule { }
