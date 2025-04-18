import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, RouterModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true
})
export class ContactsComponent {

}
