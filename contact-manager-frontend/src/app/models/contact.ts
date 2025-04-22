import { Category } from './category';
import { Subcategory } from './subcategory';

export interface Contact {
    /** Primary key – set by the backend */
    id: number;
  
    /** First name (required) */
    firstName: string;
  
    /** Last name (required) */
    lastName: string;
  
    /** Email (required) */
    email: string;
  
    /** Password (required; min. 6 characters) */
    password: string;
  
    /** Mandatory category */
    categoryId: number;
    category?: Category;        // loaded via lazy-loading or through Include
  
    /** Optional subcategory */
    subcategoryId?: number;
    subcategory?: Subcategory;

    otherSubcategory?: string; // Used only when subcategoryId is null and customSubcategoryMode is true.
  
    /** Optional phone number */
    phone?: string;
  
    /** Optional birth date */
    birthDate?: Date;
}