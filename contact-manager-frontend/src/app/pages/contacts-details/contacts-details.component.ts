import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-contact-details',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | null = null;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContactById(id).subscribe(data => {
      this.contact = data;

      this.form = this.fb.group({
        firstName: [data.firstName, Validators.required],
        lastName: [data.lastName, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        category: [data.category],
        subcategory: [data.subcategory],
        phoneNumber: [data.phone],
        dateOfBirth: [data.birthDate]
      });
    });
  }
  onSubmit() {
    if (!this.contact) return;
  
    this.contactService.updateContact(this.contact.id, this.form.value).subscribe(() => {
      alert('Contact updater!');
    });
  }
  deleteContact() {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.contact!.id).subscribe(() => {
        alert('Deleted contact!');
        this.router.navigate(['/contacts']);
      });
    }
  }
  
  
}
