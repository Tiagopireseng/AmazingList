import { MovieSeries } from '../models/movieseries.model';
import { Provider } from '../models/provider.model';

export interface DialogData {
  MovieSeries: MovieSeries;
  providersList: Provider[];
}
