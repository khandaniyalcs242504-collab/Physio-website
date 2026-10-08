import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AboutService, AboutInfo } from '../about.service';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterLinkActive, Logo],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  about: AboutInfo = {
    photoUrl: ''
  };

  constructor(
    public aboutService: AboutService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const cachedAbout = this.aboutService.getCachedAbout();

    if (cachedAbout) {
      this.about = cachedAbout;
      this.cdr.detectChanges();
    }

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