import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GalleryService, GalleryItem } from '../gallery.service';

@Component({
  selector: 'app-admin-gallery',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-gallery.html',
  styleUrl: './admin-gallery.css'
})
export class AdminGallery implements OnInit {

  galleryItems: GalleryItem[] = [];

  newItem: GalleryItem = {
    title: '',
    category: '',
    description: '',
    order: 0
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  isEditing = false;
  editingId: string | null = null;

  constructor(
    public galleryService: GalleryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadGallery();
  }

  loadGallery() {
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

  addPhoto() {
    if (!this.newItem.title) {
      alert('Please enter a photo title.');
      return;
    }

    if (!this.isEditing && !this.selectedFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newItem.title);
    formData.append('category', this.newItem.category || '');
    formData.append('description', this.newItem.description || '');
    formData.append('order', String(this.newItem.order || 0));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditing && this.editingId) {
      this.galleryService.updateGalleryItem(this.editingId, formData).subscribe({
        next: () => {
          this.loadGallery();
          this.clearForm();
        },
        error: (err) => {
          console.error('Error updating photo:', err);
          alert('Failed to update photo.');
        }
      });
    } else {
      this.galleryService.createGalleryItem(formData).subscribe({
        next: () => {
          this.loadGallery();
          this.clearForm();
        },
        error: (err) => {
          console.error('Error adding photo:', err);
          alert('Failed to add photo.');
        }
      });
    }
  }

  editPhoto(item: GalleryItem) {
    this.isEditing = true;
    this.editingId = item._id || null;
    this.newItem = {
      title: item.title,
      category: item.category,
      description: item.description,
      order: item.order
    };
    this.previewUrl = this.galleryService.getFullImageUrl(item.imageUrl);
    this.selectedFile = null;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  deletePhoto(id: string | undefined) {
    if (!id) return;

    const confirmDelete = confirm('Are you sure you want to delete this photo?');
    if (!confirmDelete) return;

    this.galleryService.deleteGalleryItem(id).subscribe({
      next: () => {
        this.loadGallery();
      },
      error: (err) => {
        console.error('Error deleting photo:', err);
        alert('Failed to delete photo.');
      }
    });
  }

  previewPhoto(item: GalleryItem) {
    const url = this.galleryService.getFullImageUrl(item.imageUrl);
    window.open(url, '_blank');
  }

  clearForm() {
    this.newItem = {
      title: '',
      category: '',
      description: '',
      order: 0
    };
    this.selectedFile = null;
    this.previewUrl = null;
    this.isEditing = false;
    this.editingId = null;
  }
}