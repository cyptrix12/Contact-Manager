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
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private authService: AuthService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
