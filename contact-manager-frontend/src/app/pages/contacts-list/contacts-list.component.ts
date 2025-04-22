import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-contacts-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = []; // Stores the list of contacts

  constructor(
    private contactService: ContactService, // Service for fetching contact data
    private authService: AuthService // Service for authentication state
  ) {}

  ngOnInit(): void {
    // Fetch the list of contacts when the component initializes
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  // Check if the user is logged in
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
