import { Provider } from './provider.model';

export interface MovieSeries {
  id: number;
  title: string;
  year: number;
  genre: string;
  description: string;
  providers: Provider[];
  poster: string;
}
