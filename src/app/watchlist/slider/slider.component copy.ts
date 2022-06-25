import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailWatchlist } from 'src/app/display/models/detailwatchlist.model';
import { MovieSeries } from 'src/app/display/models/movieseries.model';
import { Watchlist } from 'src/app/display/models/watchlist.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() watchlist: MovieSeries[] = [];
  @Input() movies: MovieSeries[] = [];
  @Input() watchlistObs!: DetailWatchlist;

  constructor() {}

  ngOnInit(): void {
    console.log('Watchlist: ', this.watchlistObs);
  }
}
