import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServicesService, Service } from '../services.service';

@Component({
  selector: 'app-admin-services',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-services.html',
  styleUrl: './admin-services.css'
})
export class AdminServices implements OnInit {

  services: Service[] = [];

  newService: Service = {
    title: '',
    description: ''
  };

  isEditing = false;
  editingId: string | null = null;

  constructor(
    private servicesService: ServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading services:', err);
      }
    });
  }

  addService() {
    if (!this.newService.title || !this.newService.description) {
      alert('Please fill in service name and description.');
      return;
    }

    if (this.isEditing && this.editingId) {
      this.servicesService.updateService(this.editingId, this.newService).subscribe({
        next: () => {
          this.loadServices();
          this.clearForm();
        },
        error: (err) => {
          console.error('Error updating service:', err);
          alert('Failed to update service.');
        }
      });
    } else {
      this.servicesService.createService(this.newService).subscribe({
        next: () => {
          this.loadServices();
          this.clearForm();
        },
        error: (err) => {
          console.error('Error creating service:', err);
          alert('Failed to add service.');
        }
      });
    }
  }

  editService(service: Service) {
    this.isEditing = true;
    this.editingId = service._id || null;
    this.newService = {
      title: service.title,
      description: service.description
    };
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  deleteService(id: string | undefined) {
    if (!id) return;

    const confirmDelete = confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return;

    this.servicesService.deleteService(id).subscribe({
      next: () => {
        this.loadServices();
      },
      error: (err) => {
        console.error('Error deleting service:', err);
        alert('Failed to delete service.');
      }
    });
  }

  clearForm() {
    this.newService = {
      title: '',
      description: ''
    };
    this.isEditing = false;
    this.editingId = null;
  }
}