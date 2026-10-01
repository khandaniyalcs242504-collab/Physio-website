import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReviewsService, Review } from '../reviews.service';

@Component({
  selector: 'app-admin-reviews',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-reviews.html',
  styleUrl: './admin-reviews.css'
})
export class AdminReviews implements OnInit {

  reviews: Review[] = [];

  constructor(
    private reviewsService: ReviewsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewsService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  getStars(rating: number | undefined): string {
    const r = rating || 5;
    return '*'.repeat(r) + '-'.repeat(5 - r);
  }

  deleteReview(id: string | undefined) {
    if (!id) return;

    const confirmDelete = confirm('Are you sure you want to delete this review? This cannot be undone.');
    if (!confirmDelete) return;

    this.reviewsService.deleteReview(id).subscribe({
      next: () => {
        this.loadReviews();
      },
      error: (err) => {
        console.error('Error deleting review:', err);
        alert('Failed to delete review.');
      }
    });
  }
}