import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

export interface Users extends Object {
  data?: Array<any>;
  msg?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData: any;
  showPassword: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  ngOnInit(): void {}
  // Login Form
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // Login functionality
  onLogin() {
    if (this.loginForm.valid) {
      this.authService
        .getById(this.loginForm.value.username as string)
        .subscribe((res: Users) => {
          this.userData = res;

          if (res.data && res.data.length > 0) {
            const userData = res.data[0];

            if (
              userData &&
              userData.password === this.loginForm.value.password &&
              userData.id === this.loginForm.value.username
              ) {
                // Success Message
                if(userData.isactive === true){
                  this.toastr.success('Login Successfully!', 'Success', {
                    timeOut: 1000,
                  });
                }
                if (userData.isactive) {
                  sessionStorage.setItem('username', userData.id);
                  sessionStorage.setItem('userrole', userData.role);
                  this.router.navigate(['/notice']);
                } else {
                  // Error Message
                  this.toastr.error('Please contact admin', 'In Active User', {
                    timeOut: 1000,
                  });
                }
              }
            } else {
              // Error Message
              this.toastr.error('Invalid Credentials', 'Error', {
              timeOut: 1500,
            });
          }
        });
    } else {
      // Warning for validation.
      this.toastr.warning('Please enter valid data.');
    }
  }

  // Show password functionality
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
