import { Component, OnInit } from '@angular/core';
import { Ingredient } from './pizzacard/ingredients';
import { Pizza } from './pizzacard/pizza';
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

@Component({
  selector: 'app-pizzadisplay',
  templateUrl: './pizzadisplay.component.html',
  styleUrls: ['./pizzadisplay.component.scss'],
})
export class PizzadisplayComponent implements OnInit {
  title = 'AngularMatCrud';
  pizzaList: Pizza[] = [];
  ingredientsList: Ingredient[] = [];
  movieSeriesList: MovieSeries[] = [];

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPizzas();
    this.getAllIngredients();
    this.getAllMovieSeries();
  }

  openDialog(ingredientsList: Ingredient[]): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        ingredientsList: ingredientsList,
      },
    });
    console.log(ingredientsList);
    console.log(ingredientsList[0].name);
    dialogRef.afterClosed().subscribe((result: Pizza) => {
      this.getAllPizzas();
      this.getAllMovieSeries();
      // if (result) {
      //   this.pizzaList.push(result);
      //   console.log('Result!');
      // }
      // console.log(this.pizzaList);
    });
  }

  addIngredient() {
    this.router.navigate(['/ingredientslist']);
  }

  getAllPizzas() {
    this.api.getPizzas().subscribe({
      next: (res) => {
        console.log(res);
        this.pizzaList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  getAllIngredients() {
    this.api.getIngedients().subscribe({
      next: (res) => {
        console.log(res);
        this.ingredientsList = res;
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
      this.getAllPizzas();
      this.getAllMovieSeries();
    }
  }
}
