import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GalleryService, GalleryItem } from '../gallery.service';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements OnInit {

  galleryItems: GalleryItem[] = [];

  constructor(
    public galleryService: GalleryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.galleryService.getGalleryItems().subscribe({
      next: (data) => {
        this.galleryItems = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading gallery:', err);
      }
    });
  }
}