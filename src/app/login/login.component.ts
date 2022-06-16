import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DatashareService } from '../services/datashare.service';
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
  token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private api: UserloginService,
    private router: Router,
    private datashare: DatashareService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let loginUser = this.loginForm.value;
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
        this.token = res.token;
        this.router.navigate(['/display']);
        // this.api.getUser(loginUser.username).subscribe({
        //   next: (res) => {
        //     console.log(res);
        //     const userID = res.id;
        //     this.datashare.changeUser(userID);
        //     this.router.navigate(['/display']);
        //   },
        //   error: (err) => {
        //     console.log('Get User Error:', err);
        //   },
        // });
      },
      error: (err) => {
        console.log('Authenticate User Error:', err);
      },
    });

    this.api.getUser(loginUser.username).subscribe({
      next: (user) => {
        console.log(user);
        const [active_user] = user;

        this.datashare.changeUser(active_user.id);
      },
      error: (err) => {
        console.log('Get User Error:', err);
      },
    });
  }

  logout() {
    console.log('logout');
  }
}
