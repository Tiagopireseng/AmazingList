import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserloginService } from '../services/userlogin.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userList: User[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private api: UserloginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let loginUser = this.loginForm.value;
    console.log(loginUser);
    // this.userList.map((user) => {
    //   console.log(user);
    //   if (user.username === loginUser.name) {
    //     console.log('Success!');
    //     this.router.navigate(['/display']);
    //   }
    // });
    this.api.authenticateUser(loginUser).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/display']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    console.log('logout');
  }
}
