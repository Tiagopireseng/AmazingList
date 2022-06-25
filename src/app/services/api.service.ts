import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailWatchlist } from '../display/models/detailwatchlist.model';
import { MovieSeries } from '../display/models/movieseries.model';
import { Provider } from '../display/models/provider.model';
import { Watchlist } from '../display/models/watchlist.model';

@Injectable({
  providedIn: 'any',
})
export class ApiService {
  apiURL = 'http://localhost:8000/api/';
  movieseriesUrl = this.apiURL + 'movie_series/';
  watchlistUrl = this.apiURL + 'watchlist/';
  getwatchlistUrl = this.apiURL + 'getwatchlist';

  constructor(private http: HttpClient) {}
  getMovieSeries() {
    return this.http.get<MovieSeries[]>(this.movieseriesUrl);
  }
  postMovieSeries(data: MovieSeries) {
    return this.http.post<MovieSeries>(this.movieseriesUrl, data);
  }
  deleteMovieSerie(id: number) {
    return this.http.delete(`${this.movieseriesUrl}${id}/`);
  }
  putMovieseries(id: number, data: MovieSeries) {
    return this.http.put(`${this.movieseriesUrl}${id}/`, data);
  }

  // Here ends MovieSeries features

  getWatchlist(userID: number) {
    return this.http.get<Watchlist[]>(`${this.watchlistUrl}`, {
      params: { user: userID },
    });
  }

  createWatchlist(userID: number, movieID: number) {
    return this.http.post(`${this.watchlistUrl}`, {
      user: userID,
      movie_series: [movieID],
    });
  }
  putToWatchlist(watchlistID: number, data: Watchlist) {
    return this.http.put(`${this.watchlistUrl}${watchlistID}/`, data);
  }

  getDetailWL(id: number) {
    return this.http.get<DetailWatchlist>(`${this.getwatchlistUrl}/${id}/`);
  }
  getDetailWLbyUser(id: number) {
    return this.http.get<DetailWatchlist>(`${this.getwatchlistUrl}`, {
      params: { user: id },
    });
  }

  // Here ends Watchlist features

  getProviders() {
    return this.http.get<Provider[]>(this.apiURL + 'providers/');
  }
}
