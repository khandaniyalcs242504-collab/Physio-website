import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  QualificationsService,
  QualificationCard
} from '../qualifications.service';

import {
  CertificatesService,
  Certificate
} from '../certificates.service';

@Component({
  selector: 'app-admin-qualifications',

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

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


  ngOnInit(): void {

    this.loadQualifications();

    this.loadCertificates();

  }


  // ============================
  // QUALIFICATIONS
  // ============================

  loadQualifications(): void {

    this.qualificationsService
      .getQualifications()
      .subscribe({

        next: (data) => {

          this.qualifications = data;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(
            'Error loading qualifications:',
            err
          );

        }

      });

  }


  addQualification(): void {

    if (
      !this.newQualification.title?.trim() ||
      !this.newQualification.type?.trim() ||
      !this.newQualification.description?.trim()
    ) {

      alert(
        'Please fill in Qualification, Type and Description.'
      );

      return;

    }


    // UPDATE
    if (
      this.isEditing &&
      this.editingId
    ) {

      this.qualificationsService
        .updateQualification(
          this.editingId,
          this.newQualification
        )
        .subscribe({

          next: () => {

            alert(
              'Qualification updated successfully.'
            );

            this.loadQualifications();

            this.clearForm();

          },

          error: (err) => {

            console.error(
              'Error updating qualification:',
              err
            );

            console.error(
              'Backend response:',
              err.error
            );

            alert(
              err.error?.message ||
              'Failed to update qualification.'
            );

          }

        });

      return;

    }


    // CREATE
    this.qualificationsService
      .createQualification(
        this.newQualification
      )
      .subscribe({

        next: (data) => {

          console.log(
            'Qualification created:',
            data
          );

          alert(
            'Qualification added successfully.'
          );

          this.loadQualifications();

          this.clearForm();

        },

        error: (err) => {

          console.error(
            'Error creating qualification:',
            err
          );

          console.error(
            'Backend response:',
            err.error
          );

          alert(
            err.error?.message ||
            'Failed to add qualification.'
          );

        }

      });

  }


  editQualification(
    item: QualificationCard
  ): void {

    this.isEditing = true;

    this.editingId = item._id || null;

    this.newQualification = {

      title: item.title || '',

      type: item.type || '',

      institution: item.institution || '',

      year: item.year || '',

      icon: item.icon || '',

      description: item.description || '',

      order: item.order ?? 0

    };


    window.scrollTo({

      top: document.body.scrollHeight,

      behavior: 'smooth'

    });

  }


  deleteQualification(
    id: string | undefined
  ): void {

    if (!id) {
      return;
    }


    const confirmDelete = confirm(
      'Are you sure you want to delete this qualification?'
    );


    if (!confirmDelete) {
      return;
    }


    this.qualificationsService
      .deleteQualification(id)
      .subscribe({

        next: () => {

          alert(
            'Qualification deleted successfully.'
          );

          this.loadQualifications();

        },

        error: (err) => {

          console.error(
            'Error deleting qualification:',
            err
          );

          console.error(
            'Backend response:',
            err.error
          );

          alert(
            err.error?.message ||
            'Failed to delete qualification.'
          );

        }

      });

  }


  clearForm(): void {

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


  // ============================
  // CERTIFICATES
  // ============================

  loadCertificates(): void {

    this.certificatesService
      .getCertificates()
      .subscribe({

        next: (data) => {

          this.certificates = data;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(
            'Error loading certificates:',
            err
          );

        }

      });

  }


  onCertFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      input.files &&
      input.files.length > 0
    ) {

      this.selectedCertFile =
        input.files[0];


      const reader =
        new FileReader();


      reader.onload = () => {

        this.certPreviewUrl =
          reader.result as string;

        this.cdr.detectChanges();

      };


      reader.readAsDataURL(
        this.selectedCertFile
      );

    }

  }


  addCertificate(): void {

    if (!this.selectedCertFile) {

      alert(
        'Please select a certificate image.'
      );

      return;

    }


    const formData =
      new FormData();


    formData.append(
      'title',
      this.newCertificateTitle || ''
    );


    formData.append(
      'order',
      '0'
    );


    formData.append(
      'image',
      this.selectedCertFile
    );


    this.certificatesService
      .createCertificate(formData)
      .subscribe({

        next: () => {

          alert(
            'Certificate added successfully.'
          );

          this.loadCertificates();

          this.newCertificateTitle = '';

          this.selectedCertFile = null;

          this.certPreviewUrl = null;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(
            'Error adding certificate:',
            err
          );

          console.error(
            'Backend response:',
            err.error
          );

          alert(
            err.error?.message ||
            'Failed to add certificate.'
          );

        }

      });

  }


  deleteCertificate(
    id: string | undefined
  ): void {

    if (!id) {
      return;
    }


    const confirmDelete = confirm(
      'Are you sure you want to delete this certificate?'
    );


    if (!confirmDelete) {
      return;
    }


    this.certificatesService
      .deleteCertificate(id)
      .subscribe({

        next: () => {

          alert(
            'Certificate deleted successfully.'
          );

          this.loadCertificates();

        },

        error: (err) => {

          console.error(
            'Error deleting certificate:',
            err
          );

          console.error(
            'Backend response:',
            err.error
          );

          alert(
            err.error?.message ||
            'Failed to delete certificate.'
          );

        }

      });

  }

}