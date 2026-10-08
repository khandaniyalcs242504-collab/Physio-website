import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AboutService, AboutInfo } from '../about.service';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink, Logo],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {

  doctorName = 'Dr. Khadija Kardekar';

  tagline = 'Helping You Move Better';

  aboutText =
    'Dr. Khadija Kardekar is a qualified physiotherapist with 4+ years of professional experience. ' +
    'She completed her Bachelor of Physiotherapy (BPT) from Maharashtra University of Health Sciences, Nashik, ' +
    'and began her career in Mumbai. ' +
    'She has successfully treated 1000+ patients with Musculoskeletal and Neurological conditions ' +
    'and has worked with hospitals including Burhani Hospital, Prime Hospital and Rehmania Hospital. ' +
    'She has also served as a Senior Consultant Physiotherapist at MESCO Physiotherapy Centre ' +
    'and is a certified Dry Needling Practitioner and Therapeutic Taping Specialist. ' +
    'She remains dedicated to helping patients improve their physical movement, recovery and overall well-being ' +
    'through personalized, patient-focused care.';

  about: AboutInfo = {
    experience: '',
    patientsTreated: '',
    photoUrl: ''
  };

  constructor(
    public aboutService: AboutService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
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
}