import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'contacts/add', loadComponent: () => import ('./pages/contact-add/contact-add.component').then(m => m.ContactAddComponent), canActivate: [AuthGuard] },
  { path: 'contacts/:id', loadComponent: () => import('./pages/contacts-details/contacts-details.component').then(m => m.ContactDetailsComponent) },
  { path: 'contacts', loadComponent: () => import('./pages/contacts-list/contacts-list.component').then(m => m.ContactsListComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  
];
