import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieSeries } from '../display/models/movieseries.model';

@Injectable({
  providedIn: 'any',
})
export class ApiService {
  apiURL = 'http://localhost:8000/api/';
  movieseriesUrl = this.apiURL + 'movie_series/';
  watchlistUrl = this.apiURL + 'watchlist/';

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
  getWatchlist(userID: number) {
    return this.http.get<number[]>(`${this.watchlistUrl}`, {
      params: { user: userID },
    });
  }
}
