import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Service/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordStrength: string = '';
  passwordStrengthText: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }

  checkPasswordStrength() {
    const password = this.registerForm.controls['password'].value;
    const strongPasswordPattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})'
    );
    const mediumPasswordPattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'
    );
    const weakPasswordPattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,})'
    );

    if (strongPasswordPattern.test(password)) {
      this.passwordStrength = 'strong';
      this.passwordStrengthText = '';
    } else if (mediumPasswordPattern.test(password)) {
      this.passwordStrength = 'medium';
      this.passwordStrengthText = 'Password must be at least 10 characters and contain 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol.';
    } else if (weakPasswordPattern.test(password)) {
      this.passwordStrength = 'weak';
      this.passwordStrengthText = 'Password must be at least 10 characters and contain 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol.';
    } else {
      this.passwordStrength = 'very-weak';
      this.passwordStrengthText = 'Password must be at least 10 characters and contain 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol.';
    }
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordStrength === 'strong') {
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username, email, password).subscribe((data) => {
        Swal.fire({
          title: "Good job!",
          text: "User registered successfully",
          icon: "success"
        });
        this.router.navigate(['/login']);
      });
    }
  }
}
