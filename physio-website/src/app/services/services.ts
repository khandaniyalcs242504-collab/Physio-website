import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService, Service } from '../services.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {

  services: Service[] = [];

  constructor(
    private servicesService: ServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
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
}