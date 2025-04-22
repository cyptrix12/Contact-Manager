import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category';
import { Subcategory } from '../../models/subcategory';

@Component({
  standalone: true,
  selector: 'app-contact-details',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | null = null; // The contact being edited
  form!: FormGroup; // Reactive form for editing the contact
  categories: Category[] = []; // List of available categories
  subcategories: Subcategory[] = []; // List of subcategories for the selected category
  customSubcategoryMode = false; // Indicates if the "other" category is selected

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get the contact ID from the route
    this.loadCategories(); // Load the list of categories
    this.contactService.getContactById(id).subscribe(data => {
      this.contact = data;
      console.log('Contact', data);

      // If categoryId == 3, treat the subcategory as a custom string
      this.customSubcategoryMode = data.categoryId === 3;

      // Build the form with common fields
      this.form = this.fb.group({
        firstName: [data.firstName, Validators.required],
        lastName: [data.lastName, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        password: [data.password, [Validators.required, Validators.minLength(6)]],
        categoryId: [data.categoryId, Validators.required],
        phone: [data.phone],
        birthDate: [data.birthDate]
      });

      // Clear the 'notUnique' error when the email field value changes
      this.form.get('email')?.valueChanges.subscribe(() => {
        this.form.get('email')?.setErrors(null);
      });

      // Add the appropriate control for the subcategory
      if (this.customSubcategoryMode) {
        console.log('Custom subcategory mode enabled');
        console.log('OtherSubcategory:', data);
        // In custom mode, show a text field for OtherSubcategory
        this.form.addControl('otherSubcategory', this.fb.control(data.otherSubcategory, Validators.required));
      } else {
        // In other modes, use a select control for subcategory (stores the ID)
        this.form.addControl('subcategory', this.fb.control(data.subcategoryId, Validators.required));
        // If categoryId exists, load the list of subcategories
        if (data.categoryId) {
          this.loadSubcategories(data.categoryId);
        }
      }
    });
  }

  onSubmit() {
    if (!this.contact || !this.form.valid) return;

    const formValue = this.form.value;
    console.log('Form value onSubmit:', formValue);

    // Prepare the updated contact object
    const updatedContact = {
      id: this.contact.id,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      birthDate: formValue.birthDate,
      categoryId: formValue.categoryId,
      subcategoryId: this.customSubcategoryMode ? null : formValue.subcategory,
      otherSubcategory: this.customSubcategoryMode ? formValue.otherSubcategory : null
    };

    console.log('Prepared updatedContact:', updatedContact);

    // Send the updated contact to the backend
    this.contactService.updateContact(this.contact.id, updatedContact).subscribe({
      next: () => {
        alert('Contact updated!');
        this.router.navigate(['/contacts']);
      },
      error: err => {
        if (err.status === 409) {
          console.error('Email already exists');
          this.form.get('email')?.setErrors({ notUnique: true }); // Set the 'notUnique' error on the email field
        } else {
          console.error('Update error:', err);
          alert('Update failed.');
        }
      }
    });
  }

  // Get the name of the selected category
  getCategoryName(): string {
    return this.contact ? (this.categories.find(cat => cat.id === this.contact!.categoryId)?.name || '') : '';
  }

  // Get the name of the selected subcategory
  getSubcategoryName(): string {
    const sub = this.subcategories.find(sub => sub.id === this.contact?.subcategoryId);
    return sub ? sub.name : '';
  }

  // Load the list of categories from the backend
  loadCategories() {
    this.contactService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  // Load the list of subcategories for the selected category
  loadSubcategories(categoryId: number): void {
    this.contactService.getSubcategories(categoryId).subscribe(data => {
      console.log('Loaded subcategories:', data);
      this.subcategories = data;

      // Set the default value for subcategory if subcategories exist
      if (this.subcategories.length > 0) {
        this.form.patchValue({ subcategory: this.subcategories[0].id });
        this.form.get('subcategory')?.setValidators(Validators.required);
      } else {
        // If no subcategories are available, set subcategory to null and remove required validator
        this.form.patchValue({ subcategory: null });
        this.form.get('subcategory')?.clearValidators();
      }
      this.form.get('subcategory')?.updateValueAndValidity();
    });
  }

  // Handle category change event
  onCategoryChange(): void {
    const categoryId = this.form.get('categoryId')?.value as number | null;
    console.log('Changed categoryId:', categoryId);

    const selectedCategory = this.categories.find(c => c.id === categoryId);
    console.log('Selected category:', selectedCategory);

    if (selectedCategory?.name === 'other') {
      // Switch to custom subcategory mode
      this.customSubcategoryMode = true;

      // Remove the 'subcategory' control if it exists
      if (this.form.contains('subcategory')) {
        this.form.removeControl('subcategory');
      }

      // Add the 'otherSubcategory' control if it doesn't exist
      if (!this.form.contains('otherSubcategory')) {
        this.form.addControl('otherSubcategory', this.fb.control('', Validators.required));
      }

      // Optionally set the default value from existing contact data
      this.form.patchValue({ otherSubcategory: this.contact?.otherSubcategory || '' });
    } else {
      // Standard mode
      this.customSubcategoryMode = false;

      // Remove the 'otherSubcategory' control if it exists
      if (this.form.contains('otherSubcategory')) {
        this.form.removeControl('otherSubcategory');
      }

      // Add the 'subcategory' control if it doesn't exist
      if (!this.form.contains('subcategory')) {
        this.form.addControl('subcategory', this.fb.control(null));
      }

      // If the category has subcategories, load them
      if (categoryId) {
        this.loadSubcategories(categoryId);
      } else {
        // If no subcategories are available, set subcategory to null
        this.form.patchValue({ subcategory: null });
      }
    }
  }

  // Delete the contact
  deleteContact() {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.contact!.id).subscribe(() => {
        alert('Deleted contact!');
        this.router.navigate(['/contacts']);
      });
    }
  }

  // Check if the user is logged in
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
