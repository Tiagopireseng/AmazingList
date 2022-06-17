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
import { DatashareService } from '../services/datashare.service';
import { Watchlist } from './models/watchlist.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  title = 'AngularMatCrud';
  movieSeriesList: MovieSeries[] = [];
  activeUserID?: number;
  watchlist?: Watchlist;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    private datashare: DatashareService
  ) {}

  ngOnInit() {
    this.getAllMovieSeries();
    this.datashare.currentUserID.subscribe((id) => (this.activeUserID = id));
    console.log('Active User ID: ', this.activeUserID);
    if (this.activeUserID === undefined) {
      console.log('No user logged in, redirecting to login');
      this.router.navigate(['']);
    } else {
      this.getUserWatchlist(this.activeUserID);
    }
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

  getUserWatchlist(userID: number) {
    this.api.getWatchlist(userID).subscribe({
      next: (res) => {
        console.log('Watchlist! ', res);
        [this.watchlist] = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  addToWatchlist(movieID: number) {
    if (this.watchlist === undefined) {
      console.log('Creating watchlist');
      this.api.createWatchlist(this.activeUserID!, movieID).subscribe({
        next: (res) => {
          console.log(res);
          this.getUserWatchlist(this.activeUserID!);
        },
      });
    }
    if (this.watchlist!.movie_series.includes(movieID)) {
      alert('Movie already in watchlist');
    } else {
      console.log('Adding to watchlist');
      this.watchlist!.movie_series.push(movieID);
      let data = this.watchlist!;
      this.api.putToWatchlist(this.watchlist!.id, data).subscribe({
        next: (res) => {
          console.log(res);
          this.getUserWatchlist(this.activeUserID!);
        },
      });
    }
  }
}
