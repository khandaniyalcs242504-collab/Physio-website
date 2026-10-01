import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService, ContactInfo } from '../contact.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {

  doctorName = 'Dr. Khadija Kardekar';

  contact: ContactInfo = {
    phones: [],
    emails: []
  };

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.contactService.getContact().subscribe({
      next: (data) => {
        this.contact = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading contact info:', err);
      }
    });
  }

  sendMessage() {

    const nameInput = document.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;

    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;

    const subjectInput = document.querySelector(
      'input[name="subject"]'
    ) as HTMLInputElement;

    const messageInput = document.querySelector(
      'textarea[name="message"]'
    ) as HTMLTextAreaElement;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill all the fields.');
      return;
    }

    const recipientEmail = (this.contact.emails && this.contact.emails.length > 0)
      ? this.contact.emails[0]
      : '';

    const emailBody =
      `Hello,%0D%0A%0D%0A` +
      `${message}%0D%0A%0D%0A` +
      `Name: ${name}%0D%0A` +
      `Email: ${email}`;

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${recipientEmail}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${emailBody}`;

    window.open(gmailUrl, '_blank');
  }
}