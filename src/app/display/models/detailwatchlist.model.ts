import { MovieSeries } from './movieseries.model';

export interface DetailWatchlist {
  id: number;
  user: number;
  movie_series: MovieSeries[];
}
