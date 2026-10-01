import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { QualificationsService, QualificationCard } from '../qualifications.service';
import { CertificatesService, Certificate } from '../certificates.service';

@Component({
  selector: 'app-admin-qualifications',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-qualifications.html',
  styleUrl: './admin-qualifications.css'
})
export class AdminQualifications implements OnInit {

  qualifications: QualificationCard[] = [];

  newQualification: QualificationCard = {
    title: '',
    type: '',
    institution: '',
    year: '',
    icon: '',
    description: '',
    order: 0
  };

  isEditing = false;
  editingId: string | null = null;

  certificates: Certificate[] = [];
  newCertificateTitle = '';
  selectedCertFile: File | null = null;
  certPreviewUrl: string | null = null;

  constructor(
    private qualificationsService: QualificationsService,
    public certificatesService: CertificatesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadQualifications();
    this.loadCertificates();
  }

  loadQualifications() {
    this.qualificationsService.getQualifications().subscribe({
      next: (data) => {
        this.qualifications = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading qualifications:', err);
      }
    });
  }

  addQualification() {
    if (!this.newQualification.title || !this.newQualification.type || !this.newQualification.description) {
      alert('Please fill in Qualification, Type and Description.');
      return;
    }

    if (this.isEditing && this.editingId) {
      this.qualificationsService.updateQualification(this.editingId, this.newQualification).subscribe({
        next: () => {
          this.loadQualifications();
          this.clearForm();
        },
        error: (err) => {
          console.error('Error updating qualification:', err);
          alert('Failed to update qualification.');
        }
      });
    } else {
      this.qualificationsService.createQualification(this.newQualification).subscribe({
        next: () => {
          this.loadQualifications();
          this.clearForm();
        },
        error: (err) => {
          console.error('Error creating qualification:', err);
          alert('Failed to add qualification.');
        }
      });
    }
  }

  editQualification(item: QualificationCard) {
    this.isEditing = true;
    this.editingId = item._id || null;
    this.newQualification = {
      title: item.title,
      type: item.type,
      institution: item.institution,
      year: item.year,
      icon: item.icon,
      description: item.description,
      order: item.order
    };
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  deleteQualification(id: string | undefined) {
    if (!id) return;

    const confirmDelete = confirm('Are you sure you want to delete this qualification?');
    if (!confirmDelete) return;

    this.qualificationsService.deleteQualification(id).subscribe({
      next: () => {
        this.loadQualifications();
      },
      error: (err) => {
        console.error('Error deleting qualification:', err);
        alert('Failed to delete qualification.');
      }
    });
  }

  clearForm() {
    this.newQualification = {
      title: '',
      type: '',
      institution: '',
      year: '',
      icon: '',
      description: '',
      order: 0
    };
    this.isEditing = false;
    this.editingId = null;
  }

  loadCertificates() {
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

  onCertFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedCertFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.certPreviewUrl = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedCertFile);
    }
  }

  addCertificate() {
    if (!this.selectedCertFile) {
      alert('Please select a certificate image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newCertificateTitle || '');
    formData.append('order', '0');
    formData.append('image', this.selectedCertFile);

    this.certificatesService.createCertificate(formData).subscribe({
      next: () => {
        this.loadCertificates();
        this.newCertificateTitle = '';
        this.selectedCertFile = null;
        this.certPreviewUrl = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error adding certificate:', err);
        alert('Failed to add certificate.');
      }
    });
  }

  deleteCertificate(id: string | undefined) {
    if (!id) return;

    const confirmDelete = confirm('Are you sure you want to delete this certificate?');
    if (!confirmDelete) return;

    this.certificatesService.deleteCertificate(id).subscribe({
      next: () => {
        this.loadCertificates();
      },
      error: (err) => {
        console.error('Error deleting certificate:', err);
        alert('Failed to delete certificate.');
      }
    });
  }
}