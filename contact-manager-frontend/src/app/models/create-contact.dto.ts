/**
 * Data required to create a contact.
 * All fields from Contact except 'id'.
 */

export interface CreateContactDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    categoryId: number;
    subcategoryId?: number;
    OtherSubcategory?: string;
    phone?: string;
    birthDate?: string;
  }