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
    'Dr. Khadija Kardekar completed her Bachelor of Physiotherapy (BPT) ' +
    'and began her career working at a hospital for a year, ' +
    'gaining hands-on clinical experience across a range of patient conditions. ' +
    'She went on to open her own physiotherapy clinic in Marol, ' +
    'which has since closed. ' +
    'With 4+ years of professional experience, ' +
    'she remains dedicated to helping patients improve their movement, ' +
    'recovery and overall physical well-being ' +
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