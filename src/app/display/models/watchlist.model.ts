import { MovieSeries } from './movieseries.model';

export interface Watchlist {
  id: number;
  user: number;
  movie_series: number[];
}
