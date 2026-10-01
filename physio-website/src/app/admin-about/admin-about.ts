import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AboutService, AboutInfo } from '../about.service';

@Component({
  selector: 'app-admin-about',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-about.html',
  styleUrl: './admin-about.css'
})
export class AdminAbout implements OnInit {

  about: AboutInfo = {
    experience: '',
    patientsTreated: '',
    photoUrl: ''
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    public aboutService: AboutService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAbout();
  }

  loadAbout() {
    this.aboutService.getAbout().subscribe({
      next: (data) => {
        this.about = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading about info:', err);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveChanges() {
    const formData = new FormData();
    formData.append('experience', this.about.experience || '');
    formData.append('patientsTreated', this.about.patientsTreated || '');

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.aboutService.updateAbout(formData).subscribe({
      next: (data) => {
        this.about = data;
        this.selectedFile = null;
        this.previewUrl = null;
        this.cdr.detectChanges();
        alert('About information saved successfully!');
      },
      error: (err) => {
        console.error('Error saving about info:', err);
        alert('Failed to save about information.');
      }
    });
  }
}