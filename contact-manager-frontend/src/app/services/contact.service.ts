import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';
import { CreateContactDto } from '../models/create-contact.dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:7243/api/contacts'; // Base API URL for contacts

  constructor(private http: HttpClient) {}

  // Fetch all contacts
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  // Fetch all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://localhost:7243/api/categories');
  }
  
  // Fetch subcategories for a specific category
  getSubcategories(categoryId: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`https://localhost:7243/api/categories/${categoryId}/subcategories`);
  }

  // Fetch a specific contact by ID
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  // Add a new contact
  addContact(contact: CreateContactDto): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  // Update an existing contact
  updateContact(id: number, contact: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }

  // Delete a contact by ID
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
