import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './display.component';
import { HeaderModule } from '../header/header.module';
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
import { MaterialElevationDirective } from './hover-elevation.directive';
import { MovieserieComponent } from './movieserie/movieserie.component';

@NgModule({
  declarations: [
    DisplayComponent,
    DialogComponent,
    MaterialElevationDirective,
    MovieserieComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DisplayRoutingModule,
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
export class DisplayModule {}
