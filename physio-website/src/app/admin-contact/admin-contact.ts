import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService, ContactInfo } from '../contact.service';

@Component({
  selector: 'app-admin-contact',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-contact.html',
  styleUrl: './admin-contact.css'
})
export class AdminContact implements OnInit {

  contact: ContactInfo = {
    phones: [''],
    emails: ['']
  };

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadContact();
  }

  loadContact() {
    this.contactService.getContact().subscribe({
      next: (data) => {
        const phones = data.phones && data.phones.length > 0 ? [...data.phones] : [''];
        const emails = data.emails && data.emails.length > 0 ? [...data.emails] : [''];

        this.contact = {
          _id: data._id,
          phones: phones,
          emails: emails
        };

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading contact info:', err);
      }
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  addPhoneField() {
    this.contact.phones = [...(this.contact.phones || []), ''];
  }

  removePhoneField(index: number) {
    const updated = [...(this.contact.phones || [])];
    updated.splice(index, 1);
    this.contact.phones = updated.length > 0 ? updated : [''];
  }

  addEmailField() {
    this.contact.emails = [...(this.contact.emails || []), ''];
  }

  removeEmailField(index: number) {
    const updated = [...(this.contact.emails || [])];
    updated.splice(index, 1);
    this.contact.emails = updated.length > 0 ? updated : [''];
  }

  onPhoneChange(index: number, value: string) {
    const updated = [...(this.contact.phones || [])];
    updated[index] = value;
    this.contact.phones = updated;
  }

  onEmailChange(index: number, value: string) {
    const updated = [...(this.contact.emails || [])];
    updated[index] = value;
    this.contact.emails = updated;
  }

  saveContact() {
    const cleanedContact: ContactInfo = {
      phones: (this.contact.phones || []).filter(p => p.trim() !== ''),
      emails: (this.contact.emails || []).filter(e => e.trim() !== '')
    };

    this.contactService.updateContact(cleanedContact).subscribe({
      next: (data) => {
        const phones = data.phones && data.phones.length > 0 ? [...data.phones] : [''];
        const emails = data.emails && data.emails.length > 0 ? [...data.emails] : [''];

        this.contact = {
          _id: data._id,
          phones: phones,
          emails: emails
        };

        this.cdr.detectChanges();
        alert('Contact details saved successfully!');
      },
      error: (err) => {
        console.error('Error saving contact info:', err);
        alert('Failed to save contact details.');
      }
    });
  }

  clearForm() {
    this.contact = {
      phones: [''],
      emails: ['']
    };
  }
}