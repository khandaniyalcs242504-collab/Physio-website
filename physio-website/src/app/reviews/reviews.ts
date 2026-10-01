import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReviewsService, Review } from '../reviews.service';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews implements OnInit {

  reviews: Review[] = [];

  newReview: Review = {
    name: '',
    reviewText: '',
    rating: 5
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

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

  getStars(rating: number | undefined): string {
    const r = rating || 5;
    return '*'.repeat(r) + '-'.repeat(5 - r);
  }

  submitReview() {
    this.submitError = '';
    this.submitSuccess = false;

    if (!this.newReview.name.trim() || !this.newReview.reviewText.trim()) {
      this.submitError = 'Please enter your name and a review before submitting.';
      this.cdr.detectChanges();
      return;
    }

    this.isSubmitting = true;

    this.reviewsService.createReview(this.newReview).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.newReview = { name: '', reviewText: '', rating: 5 };
        this.loadReviews();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        this.isSubmitting = false;
        this.submitError = 'Something went wrong. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}