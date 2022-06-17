import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MovieSeries } from '../models/movieseries.model';

@Component({
  selector: 'app-movieserie',
  templateUrl: './movieserie.component.html',
  styleUrls: ['./movieserie.component.scss'],
})
export class MovieserieComponent implements OnInit {
  @Input() movieseries!: MovieSeries;

  @Output() deleteMSID = new EventEmitter<number>();
  @Output() UpdateMSID = new EventEmitter<string>();
  @Output() addMSIDtoWatchlist = new EventEmitter<number>();

  imageUrl: string = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // Adicionar feature de imagem depois
    // this.imageUrl = this.movieseries['imageUrl'];
  }

  addMSIDtoWatchlistEvent(value: number) {
    this.addMSIDtoWatchlist.emit(value);
  }

  addWatchlist() {
    this.addMSIDtoWatchlistEvent(this.movieseries.id);
  }

  deleteMSIDEvent(value: number) {
    this.deleteMSID.emit(value);
  }

  deleteMS() {
    this.deleteMSIDEvent(this.movieseries.id);
  }

  updateEvent(value: string) {
    this.UpdateMSID.emit(value);
  }

  editMS(MovieSeries: MovieSeries): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        MovieSeries: this.movieseries,
      },
    });
    console.log('Edit runing');
    console.log(MovieSeries);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.updateEvent('trigger');
    });
  }
}
