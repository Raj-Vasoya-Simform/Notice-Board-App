import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Users } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showPassword: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = this.authService.getAll().subscribe((res) => {
      console.log(res);
    });
  }

  // Registration Form
  registerForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(''),
    isActive: new FormControl(false),
  });

  // Register Functionality
  onRegister() {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .subscribe((res: Users) => {
          this.toastr.success(
            'Please contact admin to enable access.',
            res.msg
          );
          this.router.navigate(['auth/login']);
        });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }

  // Username error toastr
  usernameError() {
    this.toastr.warning(
      'Username is required and should have a minLength of 5 characters.',
      'Required',
      {
        timeOut: 2000,
      }
    );
  }

  // Name error toastr
  nameError() {
    this.toastr.warning('Name is required.', 'Required', {
      timeOut: 2000,
    });
  }

  // Password error toastr
  passwordError() {
    this.toastr.warning(
      'Password is required and should have one uppercase letter, one lowercase letter, one special character, one number, and a minimum length of 8 characters.',
      'Required',
      {
        timeOut: 2000,
      }
    );
  }

  // Email error toastr
  emailError() {
    this.toastr.warning('Email is required and should be valid.', 'Required', {
      timeOut: 2000,
    });
  }

  // Show password functionality
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // fetchData() {
  //   this.authService.getData().subscribe((response) => {
  //     console.log(response);
  //     // Process the response data
  //   });
  // }
}
