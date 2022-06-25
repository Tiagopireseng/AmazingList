import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogData } from './DialogData';

import { MatSelectModule } from '@angular/material/select';
import { MovieSeries } from '../models/movieseries.model';

import { Provider } from '../models/provider.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() MovieSeries: MovieSeries = this.data.MovieSeries;
  @Input() providersList: Provider[] = this.data.providersList;

  productForm!: FormGroup;
  providersForm = new FormControl();
  actionBtn: string = 'Save';
  genres: string[] = ['Fantasy', 'Sci-Fi', 'Thriller', 'Drama', 'Comedy'];

  providersName: string[] = this.providersList.map((provider: Provider) => {
    return provider.name;
  });

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
      poster: [''],
      providers: [''], //Needs to be parsed to the Provider ID to be putted or posted
    });
    if (this.data.MovieSeries) {
      this.actionBtn = 'Update';
      this.productForm.patchValue({
        title: this.data.MovieSeries.title,
        description: this.data.MovieSeries.description,
        genre: this.data.MovieSeries.genre,
        year: this.data.MovieSeries.year,
        poster: this.data.MovieSeries.poster,
        providers: this.data.MovieSeries.providers,
      });
    }
  }

  actionFunction() {
    console.log(this.productForm.value);
    if (!this.data.MovieSeries) {
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
      this.api
        .putMovieseries(this.data.MovieSeries.id, this.productForm.value)
        .subscribe({
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
