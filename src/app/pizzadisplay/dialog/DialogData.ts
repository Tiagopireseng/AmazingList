import { MovieSeries } from '../models/movieseries.model';
import { Ingredient } from '../pizzacard/ingredients';
import { Pizza } from '../pizzacard/pizza';

export interface DialogData {
  ingredientsList: Ingredient[];
  Pizza: Pizza;
  MovieSeries: MovieSeries;
}
