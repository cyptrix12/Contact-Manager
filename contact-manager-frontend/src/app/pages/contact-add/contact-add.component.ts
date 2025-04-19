import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-add',
  standalone: true,
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactAddComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      category: ['prywatny', Validators.required],
      subcategory: [''],
      phone: [''],
      birthDate: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.contactService.addContact(this.form.value).subscribe({
        next: () => {
          alert('Kontakt został dodany!');
          this.router.navigate(['/contacts']);
        },
        error: err => {
          console.error('Błąd przy dodawaniu kontaktu:', err);
        }
      });
    }
  }

  // Opcjonalnie: dynamiczna logika dla podkategorii
  isCategoryBusiness(): boolean {
    return this.form.get('category')?.value === 'służbowy';
  }

  isCategoryOther(): boolean {
    return this.form.get('category')?.value === 'inny';
  }
}
