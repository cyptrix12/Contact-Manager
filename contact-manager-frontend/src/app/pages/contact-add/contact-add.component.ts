import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category';
import { Subcategory } from '../../models/subcategory';
import { CreateContactDto } from '../../models/create-contact.dto';

@Component({
  selector: 'app-contact-add',
  standalone: true,
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactAddComponent implements OnInit {
  form!: FormGroup; // Reactive form for adding a contact
  categories: Category[] = []; // List of available categories
  subcategories: Subcategory[] = []; // List of subcategories for the selected category

  customSubcategoryMode = false; // Indicates if the "other" category is selected

  isSubmitting = false; // Indicates if the form is being submitted

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize the form with default values and validators
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6)]],
    
      categoryId:    [null, Validators.required], // Selected category ID
      subcategoryId: [null],                      // Selected subcategory ID
      subcategoryName: [''],                      // Custom subcategory name (used for "other" category)
    
      phone:     [''], // Optional phone number
      birthDate: ['']  // Optional birth date
    });
  }

  ngOnInit(): void {
    this.loadCategories(); // Load categories when the component is initialized
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    const raw = this.form.getRawValue(); // Get raw form values

    // Prepare the DTO for creating a contact
    const dto: CreateContactDto = {
      firstName:  raw.firstName!,
      lastName:   raw.lastName!,
      email:      raw.email!,
      password:   raw.password!,
      categoryId: raw.categoryId!,                    
      ...(this.customSubcategoryMode ? { OtherSubcategory: raw.subcategoryName! } : {}),
      ...(raw.subcategoryId ? { subcategoryId: raw.subcategoryId } : {}),
      ...(raw.phone        ? { phone: raw.phone } : {}),
      ...(raw.birthDate    ? { birthDate: raw.birthDate } : {})
    };

    this.isSubmitting = true; // Set submitting state to true
    this.contactService.addContact(dto).subscribe({
      next: () => this.router.navigate(['/contacts']), // Navigate to contacts list on success
      error: err => console.error(err), // Log errors
      complete: () => (this.isSubmitting = false) // Reset submitting state
    });
  }

  // Load the list of categories from the backend
  loadCategories(): void {
    this.contactService.getCategories()
        .subscribe(data => this.categories = data);
  }

  // Load the list of subcategories for the selected category
  loadSubcategories(categoryId: number): void {
    this.contactService
      .getSubcategories(categoryId)
      .subscribe(data => (this.subcategories = data));
  }

  // Handle category change event
  onCategoryChange(): void {
    const id = this.form.get('categoryId')?.value as number | null; // Get selected category ID
    const subIdCtl = this.form.get('subcategoryId'); // Get subcategory control
  
    console.log(id); // Log the selected category ID
    subIdCtl?.setValue(null); // Reset subcategory value
  
    const selected = this.categories.find(c => c.id === id); // Find the selected category
  
    if (selected?.name === 'business') {
      // If the category is "business", load subcategories
      this.customSubcategoryMode = false;
      if (id != null) this.loadSubcategories(id);          
      subIdCtl?.setValidators(Validators.required); // Make subcategory required
    }
    else if (selected?.name === 'other') {
      // If the category is "other", enable custom subcategory mode
      this.customSubcategoryMode = true;
      this.subcategories = []; // Clear subcategories
      subIdCtl?.clearValidators(); // Remove validators for subcategory
    }
    else {                                 
      // For other categories, disable custom subcategory mode
      this.customSubcategoryMode = false;
      this.subcategories = []; // Clear subcategories
      subIdCtl?.clearValidators(); // Remove validators for subcategory
    }
  
    subIdCtl?.updateValueAndValidity(); // Update the validity of the subcategory control
  }
  
  // Check if the user is logged in
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
