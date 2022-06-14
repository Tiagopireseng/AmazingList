import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { DialogData } from './dialog/DialogData';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MovieSeries } from './models/movieseries.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  title = 'AngularMatCrud';
  movieSeriesList: MovieSeries[] = [];

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllMovieSeries();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllMovieSeries();
      if (result) {
        console.log('Result!');
      }
    });
  }

  goToWatchlist() {
    this.router.navigate(['/watchlist']);
  }
  getAllMovieSeries() {
    this.api.getMovieSeries().subscribe({
      next: (res) => {
        console.log(res);
        this.movieSeriesList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  logMovieSeries() {
    console.log(this.movieSeriesList);
  }

  deleteMovieSerie(id: number) {
    this.api.deleteMovieSerie(id).subscribe({
      next: (res) => {
        console.log(res);
        alert('Product deleted successfully');
        this.movieSeriesList = this.movieSeriesList.filter(
          (res, index) => index !== id
        );
        console.log(this.movieSeriesList);
        this.getAllMovieSeries();
      },
      error: (err) => {
        alert('Error deleting product');
        console.log(err);
      },
    });
  }

  updateEvent(event: string) {
    if (event === 'trigger') {
      this.getAllMovieSeries();
    }
  }
}
