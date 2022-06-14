import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieSeries } from '../pizzadisplay/models/movieseries.model';

@Injectable({
  providedIn: 'any',
})
export class ApiService {
  pizzaUrl = 'http://localhost:3000/pizza';
  ingredientsUrl = 'http://localhost:3000/ingredients';
  movieseriesUrl = 'http://127.0.0.1:8000/api/movie_series/';

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
}
