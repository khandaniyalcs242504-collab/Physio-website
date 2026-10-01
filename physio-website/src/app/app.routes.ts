import { Routes } from '@angular/router';

import { Home } from './home/home';
import { About } from './about/about';
import { Services } from './services/services';
import { Qualifications } from './qualifications/qualifications';
import { Gallery } from './gallery/gallery';
import { Reviews } from './reviews/reviews';
import { Contact } from './contact/contact';

import { Admin } from './admin/admin';
import { AdminAbout } from './admin-about/admin-about';
import { AdminServices } from './admin-services/admin-services';
import { AdminQualifications } from './admin-qualifications/admin-qualifications';
import { AdminGallery } from './admin-gallery/admin-gallery';
import { AdminReviews } from './admin-reviews/admin-reviews';
import { AdminContact } from './admin-contact/admin-contact';
import { AdminLogin } from './admin-login/admin-login';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [

  // PUBLIC WEBSITE

  {
    path: '',
    component: Home
  },

  {
    path: 'about',
    component: About
  },

  {
    path: 'services',
    component: Services
  },

  {
    path: 'qualifications',
    component: Qualifications
  },

  {
    path: 'gallery',
    component: Gallery
  },

  {
    path: 'reviews',
    component: Reviews
  },

  {
    path: 'contact',
    component: Contact
  },


  // ADMIN LOGIN (public, no guard)

  {
    path: 'admin-login',
    component: AdminLogin
  },


  // ADMIN PANEL (protected)

  {
    path: 'admin',
    component: Admin,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/about',
    component: AdminAbout,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/services',
    component: AdminServices,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/qualifications',
    component: AdminQualifications,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/gallery',
    component: AdminGallery,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/reviews',
    component: AdminReviews,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/contact',
    component: AdminContact,
    canActivate: [AuthGuard]
  },


  // FALLBACK

  {
    path: '**',
    redirectTo: ''
  }

];