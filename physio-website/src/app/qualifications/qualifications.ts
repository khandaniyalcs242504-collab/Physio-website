import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QualificationsService, QualificationCard } from '../qualifications.service';
import { CertificatesService, Certificate } from '../certificates.service';

@Component({
  selector: 'app-qualifications',
  imports: [CommonModule, RouterLink],
  templateUrl: './qualifications.html',
  styleUrl: './qualifications.css'
})
export class Qualifications implements OnInit {

  qualifications: QualificationCard[] = [];
  certificates: Certificate[] = [];

  constructor(
    private qualificationsService: QualificationsService,
    public certificatesService: CertificatesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.qualificationsService.getQualifications().subscribe({
      next: (data) => {
        this.qualifications = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading qualifications:', err);
      }
    });

    this.certificatesService.getCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading certificates:', err);
      }
    });
  }
}