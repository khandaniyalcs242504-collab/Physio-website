import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLogin implements OnInit {

  setupNeeded = false;
  showSetupForm = false;
  isLoading = true;

  username = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.checkSetup().subscribe({
      next: (response) => {
        this.setupNeeded = response.setupNeeded;
        this.showSetupForm = response.setupNeeded;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error checking setup status:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  switchToLogin() {
    this.showSetupForm = false;
    this.errorMessage = '';
  }

  switchToSetup() {
    this.showSetupForm = true;
    this.errorMessage = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  validatePasswordStrength(password: string): string | null {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return null;
  }

  onSetupSubmit() {
    this.errorMessage = '';

    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(this.username)) {
      this.errorMessage = 'Please enter a valid @gmail.com address.';
      return;
    }

    const passwordError = this.validatePasswordStrength(this.password);
    if (passwordError) {
      this.errorMessage = passwordError;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.setupAdmin(this.username, this.password).subscribe({
      next: () => {
        alert('Admin account created successfully! Please log in.');
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.showSetupForm = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to create admin account.';
        this.cdr.detectChanges();
      }
    });
  }

  onLoginSubmit() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter your Gmail address and password.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}