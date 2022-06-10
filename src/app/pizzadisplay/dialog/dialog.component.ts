import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Ingredient } from '../pizzacard/ingredients';
import { Pizza } from '../pizzacard/pizza';
import { DialogData } from './DialogData';

import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() ingredientsList = this.data.ingredientsList;
  @Input() Pizza: Pizza = this.data.Pizza;

  productForm!: FormGroup;
  ingredientsForm = new FormControl();
  ingredientsNames: string[] = this.ingredientsList.map(
    (ingredient: Ingredient) => ingredient.name
  );
  actionBtn: string = 'Save';
  genres: string[] = ['Fantasy', 'Sci-Fi', 'Thriller', 'Drama', 'Comedy'];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', Validators.required],
    });
    if (this.data.Pizza) {
      this.actionBtn = 'Update';
      this.productForm.patchValue({
        name: this.data.Pizza.name,
        ingredients: this.data.Pizza.ingredients,
        imageUrl: this.data.Pizza.imageUrl,
      });
    }
  }

  actionFunction() {
    console.log(this.productForm.value);
    if (!this.data.Pizza) {
      this.addProduct();
    } else {
      this.updateProduct();
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      if (this.productForm.value.imageUrl === '') {
        this.productForm.value.imageUrl =
          'https://bhdicas.uai.com.br/wp-content/uploads/sites/23/2017/03/pizza-site-or.jpg';
      }
      this.api.postMovieSeries(this.productForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert('Product added successfully');
          this.productForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          alert('Error adding product');
          console.log(err);
        },
      });
    }
  }
  updateProduct() {
    if (this.productForm.valid) {
      if (this.productForm.value.imageUrl === '') {
        this.productForm.value.imageUrl =
          'https://bhdicas.uai.com.br/wp-content/uploads/sites/23/2017/03/pizza-site-or.jpg';
      }
      this.api.putPizza(this.data.Pizza.id, this.productForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert('Product updated successfully');
          this.productForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          alert('Error updating product');
          console.log(err);
        },
      });
    }
  }
}
