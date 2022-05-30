import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzadisplayRoutingModule } from './pizzadisplay-routing.module';
import { PizzadisplayComponent } from './pizzadisplay.component';
import { HeaderModule } from '../header/header.module';
import { PizzacardComponent } from './pizzacard/pizzacard.component';
import { DialogComponent } from './dialog/dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../services/api.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PizzadisplayComponent, PizzacardComponent, DialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PizzadisplayRoutingModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [ApiService],
})
export class PizzadisplayModule {}
